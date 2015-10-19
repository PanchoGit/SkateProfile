using System.Collections.Generic;

using DataInterface;

using DataModel;

namespace ApplicationService
{
    public class SkateSvcData : ISkateData
    {
        public SkateEntity Get()
        {
            var item = new SkateEntity { Id = 1, Name = "Paul Rodriguez" };
            return item;
        }

        public IEnumerable<SkateEntity> GetAll()
        {
            yield return new SkateEntity { Id = 1, Name = "Paul Rodriguez" };

            yield return new SkateEntity { Id = 2, Name = "Luan Oliveira" };

            yield return new SkateEntity { Id = 3, Name = "Kevin Hoefler" };
            
            yield return new SkateEntity { Id = 4, Name = "Leaticia Buffoni" };
        }
    }
}
