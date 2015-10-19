using System.Collections.Generic;

using DataModel;

namespace DataInterface
{
    public interface ISkateData
    {
        SkateEntity Get();

        IEnumerable<SkateEntity> GetAll();
    }
}
