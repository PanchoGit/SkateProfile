using StructureMap;
using StructureMap.Graph;

namespace BuggyWeb.DependencyResolution
{
    public static class IoC
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