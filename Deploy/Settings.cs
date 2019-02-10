using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;

namespace Deploy
{
    [DataContract]
    public class Setting
    {
        [DataMember(Name = "solution")]
        public string Solution { get; set; }
        [DataMember(Name = "name")]
        public string Name { get; set; }
        [DataMember(Name = "dist")]
        public string Dist { get; set; }
        [DataMember(Name = "url")]
        public string Url { get; set; }
        [DataMember(Name = "user")]
        public string User { get; set; }
        [DataMember(Name = "password")]
        public string Password { get; set; }

        public static Setting[] GetSettings()
        {
            if (File.Exists("deploy.config.json"))
            {
                // the double read nature of this is to overcome the json BOM parse problem, when the json config file is created or maintained with visual studio
                DataContractJsonSerializer js = new DataContractJsonSerializer(typeof(Setting[]));
                var settingString = File.ReadAllText("deploy.config.json", Encoding.UTF8);
                using (var mem = new MemoryStream(Encoding.UTF8.GetBytes(settingString)))
                {
                    return (Setting[])js.ReadObject(mem);
                }
            }
            else
            {
                throw new FileNotFoundException("Expected to find a file name [deploy.config.json] in current folder");
            }
        }
    }
}
