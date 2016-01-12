using System.Web.Mvc;

using ApplicationService;

using Autofac;
using Autofac.Integration.Mvc;

using ServiceInterface;

namespace AppWeb.DependencyResolution.Autofac
{
    public static class AutoFacIoc
    {
        public static IContainer Configure()
        {
            var builder = new ContainerBuilder();

            builder.RegisterControllers(typeof(MvcApplication).Assembly);

            builder.RegisterFilterProvider();

            builder.RegisterSource(new ViewRegistrationSource());

            builder.RegisterModule<AutofacWebTypesModule>();

            builder.RegisterType<SkateService>().As<ISkateService>()
                .WithParameter(new TypedParameter(typeof(SkateSvcData), new SkateSvcData()))
                .InstancePerHttpRequest();

            var container = builder.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            return container;
        }
    }
}