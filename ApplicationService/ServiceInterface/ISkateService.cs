using System.Collections.Generic;

using DataModel;

namespace ServiceInterface
{
    public interface ISkateService
    {
        SkateEntity Get();

        IEnumerable<SkateEntity> GetAll();
    }
}
