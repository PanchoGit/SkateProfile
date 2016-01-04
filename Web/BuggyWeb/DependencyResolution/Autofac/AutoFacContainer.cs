﻿using System.Web.Http.Dependencies;

using Autofac.Integration.Mvc;

namespace BuggyWeb.DependencyResolution.Autofac
{
    public class AutoFacContainer : AutofacScopeContainer, IDependencyResolver
    {
        public AutoFacContainer(AutofacDependencyResolver container)
            : base(container)
        {
        }

        public IDependencyScope BeginScope()
        {
            return this;
        }
    }
}