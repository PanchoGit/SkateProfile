using System.Collections.Generic;
using DataInterface;
using DataModel;
using ServiceInterface;

namespace ApplicationService
{
    public class SkateService : ISkateService
    {
        private readonly SkateSvcData data;

        public SkateService(SkateSvcData data)
        {
            this.data = data;
        }

        public SkateEntity Get()
        {
            return data.Get();
        }

        public IEnumerable<SkateEntity> GetAll()
        {
            return data.GetAll();
        }
    }
}
