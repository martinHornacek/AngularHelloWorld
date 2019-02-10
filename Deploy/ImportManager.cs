﻿using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Client;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceModel.Description;
using System.Text;
using System.Threading.Tasks;

namespace Deploy
{
    public class ImportManager
    {
        private IOrganizationService orgService;

        public ImportManager(string user, string pwd, string url)
        {
            var credentials = new ClientCredentials();
            credentials.UserName.UserName = user;
            credentials.UserName.Password = pwd;

            var config = ServiceConfigurationFactory.CreateConfiguration<IOrganizationService>(new Uri(url));

            orgService = new OrganizationServiceProxy(config, credentials);
            IOrganizationService service = (IOrganizationService)orgService;
        }

        public void Import(string dist, string name, string subPath, string solution, string prefix = null)
        {
            var path = dist;

            if (!string.IsNullOrEmpty(subPath))
            {
                path += @"\" + subPath;
            }

            if (prefix == null)
            {
                prefix = FindCustomizationPrefix(solution);
            }

            foreach (var file in Directory.GetFiles(path))
            {
                var filename = Path.GetFileName(file);
                filename = NormalizeFileName(filename);
                var resourceName = prefix + "_/" + name + (!string.IsNullOrEmpty(subPath) ? "/" + subPath.Replace("\\", "/") : "") + "/" + filename;

                var webResource = FindWebresource(resourceName);

                var data = Convert.ToBase64String(File.ReadAllBytes(file));

                if (data.Length == 0)
                {
                    data = Convert.ToBase64String(filename.DefaultContentForEmplyFile());
                }

                if (webResource != null)
                {
                    if (new FileInfo(file).LastWriteTimeUtc > ((DateTime)webResource["modifiedon"]).ToUniversalTime())
                    {
                        Console.WriteLine("Updating " + resourceName);

                        webResource["content"] = data;
                        orgService.Update(webResource);

                        var publishRequest = new PublishXmlRequest
                        {
                            ParameterXml = string.Format("<importexportxml><webresources><webresource>{0}</webresource></webresources></importexportxml>", webResource.Id)
                        };
                        orgService.Execute(publishRequest);
                    }
                }
                else
                {
                    webResource = new Entity
                    {
                        Id = Guid.NewGuid(),
                        LogicalName = "webresource"
                    };
                    webResource["name"] = resourceName;
                    webResource["content"] = data;
                    webResource["displayname"] = name + ": " + resourceName;
                    webResource["description"] = "Imported as part of the " + name + " application.";
                    var type = filename.ToResourceType();

                    if (type == ResourceTypeEnum.Unknown)
                    {
                        Console.WriteLine("Warning : unable to map file to Dynamics 365 web resource type " + filename + ". The file was ignored.");
                        continue;
                    }
                    webResource["webresourcetype"] = new OptionSetValue((int)type);
                    orgService.Create(webResource);

                    var publishRequest = new PublishXmlRequest
                    {
                        ParameterXml = string.Format("<importexportxml><webresources><webresource>{0}</webresource></webresources></importexportxml>", webResource.Id)
                    };
                    orgService.Execute(publishRequest);

                    // attach new webResource to solution
                    var request = new AddSolutionComponentRequest
                    {
                        ComponentType = 61, // Web Resource,
                        ComponentId = webResource.Id,
                        SolutionUniqueName = solution
                    };

                    orgService.Execute(request);
                    Console.WriteLine("Created " + resourceName);
                }
            }

            var sub = path;
            if (!string.IsNullOrEmpty(subPath))
            {
                sub = path + @"\" + subPath;
            }

            foreach (var dir in Directory.GetDirectories(path))
            {
                var dirname = Path.GetFileName(dir);
                if (dirname == "out-tsc")
                {
                    continue;
                }

                if (!string.IsNullOrEmpty(subPath))
                {
                    dirname = subPath + @"\" + dirname;
                }
                this.Import(dist, name, dirname, solution, prefix);
            }
        }

        private string NormalizeFileName(string filename)
        {
            if (string.IsNullOrWhiteSpace(filename)) throw new ArgumentNullException(nameof(filename));
            return filename.Replace('-', '_');
        }

        private Entity FindWebresource(string filename)
        {
            var query = new QueryExpression("webresource");
            query.ColumnSet = new ColumnSet(true);
            query.Criteria.AddCondition("name", ConditionOperator.Equal, filename);

            var res = orgService.RetrieveMultiple(query);
            return res.Entities.SingleOrDefault();
        }

        private string FindCustomizationPrefix(string uniqueName)
        {
            var query = new QueryExpression("solution");
            query.ColumnSet = new ColumnSet(true);
            query.Criteria.AddCondition("uniquename", ConditionOperator.Equal, uniqueName);

            var res = orgService.RetrieveMultiple(query);
            Entity solution = null;
            solution = res.Entities.SingleOrDefault();

            if (solution != null)
            {
                var publisherid = ((EntityReference)solution["publisherid"]).Id;

                query = new QueryExpression("publisher");
                query.ColumnSet = new ColumnSet(true);
                query.Criteria.AddCondition("publisherid", ConditionOperator.Equal, publisherid);

                res = orgService.RetrieveMultiple(query);
                return (string)res.Entities.Single()["customizationprefix"];

            }
            throw new InvalidPluginExecutionException("Unable to map solution name " + uniqueName + " to a customization prefix.");
        }
    }
}
