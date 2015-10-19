using ApplicationService;

using ServiceInterface;

using StructureMap.Configuration.DSL;

namespace BuggyWeb.Infrastructure.Registries
{
    public class ServiceRegistry : Registry
    {
        public ServiceRegistry()
        {
            For<ISkateService>().Use(new SkateService(new SkateSvcData()));
        }
    }
}