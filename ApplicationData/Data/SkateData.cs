using System.Collections.Generic;
using DataInterface;
using DataModel;

namespace ApplicationData
{
    public class SkateData : ISkateData
    {
        public SkateEntity Get()
        {
            var item = new SkateEntity { Id = 1, Name = "Paul Rodriguez" };
            return item;
        }

        public IEnumerable<SkateEntity> GetAll()
        {
            var item = new SkateEntity { Id = 1, Name = "Paul Rodriguez" };
            yield return item;
            item = new SkateEntity { Id = 2, Name = "Luan Oliveira" };
            yield return item;
        }
    }
}
