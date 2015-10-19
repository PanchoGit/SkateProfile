using System.Collections.Generic;
using System.Web.Http;

using ApplicationService;

using ServiceInterface;

namespace BuggyWeb.Controllers.Api
{
    public class SkaterController : ApiController
    {
        private readonly ISkateService service;

        public SkaterController() : this(new SkateService(new SkateSvcData()))
        {
        }

        public SkaterController(ISkateService service)
        {
            this.service = service;
        }

        // GET api/skater
        public IEnumerable<DataModel.SkateEntity> Get()
        {
            var skates = service.GetAll();

            return skates;
        }

        // GET api/skater/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/skater
        public void Post([FromBody]string value)
        {
        }

        // PUT api/skater/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/skater/5
        public void Delete(int id)
        {
        }
    }
}
