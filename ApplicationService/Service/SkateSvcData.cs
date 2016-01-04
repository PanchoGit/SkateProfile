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
            yield return new SkateEntity { Id = 5, Name = "Felipe Gustavo" };
            yield return new SkateEntity { Id = 6, Name = "Arto Saari" };
            yield return new SkateEntity { Id = 7, Name = "Santa Cruz Headress" };
            yield return new SkateEntity { Id = 8, Name = "Lucas Puig" };
            yield return new SkateEntity { Id = 9, Name = "Landy Cruz" };
            yield return new SkateEntity { Id = 10, Name = "Brandon Biebel" };
            yield return new SkateEntity { Id = 11, Name = "Neen Williams" };
            yield return new SkateEntity { Id = 12, Name = "Erik Koston" };
            yield return new SkateEntity { Id = 13, Name = "Rayne Switzer" };
            yield return new SkateEntity { Id = 14, Name = "Baker Dee" };
            yield return new SkateEntity { Id = 15, Name = "Marc Johnson" };
            yield return new SkateEntity { Id = 16, Name = "Brian Lottis" };
            yield return new SkateEntity { Id = 17, Name = "Tony Hawk" };
        }
    }
}
