using System.Web.Mvc;
using ApplicationService;

using BuggyWeb.Models;

using ServiceInterface;

namespace BuggyWeb.Controllers
{
    public class SpawnController : Controller
    {
        private readonly ISkateService service;

        public SpawnController()
        {
            service = new SkateService(new SkateSvcData());
        }

        // GET: /Spawn/
        public ActionResult Index()
        {
            var skates = service.GetAll();

            return View(new SkateModel{ Skaters = skates });
        }
    }
}
