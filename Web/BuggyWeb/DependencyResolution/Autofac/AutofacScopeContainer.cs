using System;
using System.Collections.Generic;
using System.Web.Http.Dependencies;

using Autofac;
using Autofac.Integration.Mvc;

namespace AppWeb.DependencyResolution.Autofac
{
    public class AutofacScopeContainer : IDependencyScope
    {
        private readonly AutofacDependencyResolver container;

        protected AutofacScopeContainer(AutofacDependencyResolver container)
        {
            if (container == null)
            {
                throw new ArgumentNullException("container");
            }
            this.container = container;
        }

        public object GetService(Type serviceType)
        {
            return container.ApplicationContainer.IsRegistered(serviceType)
                             ? container.GetService(serviceType)
                             : null;
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return container.ApplicationContainer.IsRegistered(serviceType)
                       ? container.GetServices(serviceType)
                       : new List<object>();
        }

        public void Dispose()
        {
            //container.ApplicationContainer.Dispose();
        }
    }
}