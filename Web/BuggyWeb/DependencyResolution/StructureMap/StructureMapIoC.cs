using StructureMap;
using StructureMap.Graph;

namespace BuggyWeb.DependencyResolution.StructureMap
{
    public static class StructureMapIoC
    {
        public static void ConfigureStructureMap(IContainer container)
        {
            container.Configure(cfg => cfg.Scan(
                s =>
                {
                    s.TheCallingAssembly();
                    s.LookForRegistries();
                }));
        }
    }
}