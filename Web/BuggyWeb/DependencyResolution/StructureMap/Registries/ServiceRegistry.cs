using ApplicationService;

using ServiceInterface;

using StructureMap.Configuration.DSL;

namespace AppWeb.DependencyResolution.StructureMap.Registries
{
    public class ServiceRegistry : Registry
    {
        public ServiceRegistry()
        {
            For<ISkateService>().Use<SkateService>().Ctor<SkateSvcData>().Is(new SkateSvcData());
        }
    }
}