using System.Reflection;
using System.Web.Mvc;

using ApplicationService;

using Autofac;
using Autofac.Integration.Mvc;

using ServiceInterface;

namespace BuggyWeb.DependencyResolution.Autofac
{
    public static class AutoFacIoc
    {
        public static IContainer Configure()
        {
            var builder = new ContainerBuilder();

            builder.RegisterControllers(typeof(MvcApplication).Assembly);

            builder.RegisterType<SkateService>().As<ISkateService>()
                .WithParameter(new TypedParameter(typeof(SkateSvcData), new SkateSvcData()))
                .InstancePerHttpRequest();

            builder.RegisterAssemblyModules(typeof(MvcApplication).Assembly);
            builder.RegisterModule<AutofacWebTypesModule>();

            var container = builder.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            return container;
        }
    }
}