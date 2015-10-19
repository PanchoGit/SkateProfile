using ServiceInterface;

using StructureMap;
using StructureMap.Graph;

namespace BuggyWeb.Infrastructure
{
    public static class BootStrapper
    {
        public static void BootStrap()
        {
            ConfigureStructureMap();
        }

        internal static void ConfigureStructureMap()
        {
            var container = new Container();
            container.Configure(cfg => cfg.Scan(
                s =>
                    {
                        s.TheCallingAssembly();
                        s.LookForRegistries();
                    }));

        }
    }
}