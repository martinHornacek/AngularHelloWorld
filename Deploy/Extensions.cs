using System.Linq;
using System.Text;

namespace Deploy
{
    public static class Extensions
    {
        public static ResourceTypeEnum ToResourceType(this string filename)
        {
            var upperExtension = filename.ToUpper().Split('.').Last();

            switch (upperExtension)
            {
                case "HTM":
                case "HTML": return ResourceTypeEnum.Html;
                case "CSS": return ResourceTypeEnum.Css;
                case "JS": return ResourceTypeEnum.JScript;
                case "XML": return ResourceTypeEnum.Xml;
                case "PNG": return ResourceTypeEnum.Png;
                case "JPEG":
                case "JPG": return ResourceTypeEnum.Jpg;
                case "GIF": return ResourceTypeEnum.Gif;
                case "XAP": return ResourceTypeEnum.Xap;
                case "XLS": return ResourceTypeEnum.Xsl;
                case "XSLT": return ResourceTypeEnum.Xsl;
                case "ICO": return ResourceTypeEnum.Ico;
            }
            return ResourceTypeEnum.Unknown;
        }

        public static byte[] DefaultContentForEmplyFile(this string filename)
        {
            var type = filename.ToResourceType();
            switch (type)
            {
                case ResourceTypeEnum.Html: return Encoding.ASCII.GetBytes("<!-- Empty html file -->");
                case ResourceTypeEnum.Css: return Encoding.ASCII.GetBytes("/* Empty css file */");
                case ResourceTypeEnum.JScript: return Encoding.ASCII.GetBytes("/* Empty javascript file */");
            }
            return new byte[0];
        }
    }
}
