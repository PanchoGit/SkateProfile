using System.Web.Http;
using System.Web.Mvc;
using StructureMap;
using BuggyWeb.DependencyResolution.StructureMap;

[assembly: WebActivator.PreApplicationStartMethod(typeof(BuggyWeb.StructuremapMvc), "Start")]

namespace BuggyWeb
{
    public static class StructuremapMvc
    {
        public static void Start()
        {
            IContainer container = new Container();
            StructureMapIoC.ConfigureStructureMap(container);
            DependencyResolver.SetResolver(new StructureMapDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new StructureMapDependencyResolver(container);
        }
    }
}