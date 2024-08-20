using Microsoft.AspNetCore.Mvc;
using TaskManagerAPI.Data;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitTaskController : ControllerBase
    {
        private readonly AppDbContext context;

        public UnitTaskController(AppDbContext context) => this.context = context;

        [HttpGet]
        public ActionResult Get() { return Ok(context.Tasks.ToList()); }

        [HttpPost]
        public ActionResult Add(UnitTaskDto task)
        {
            var newTask = new UnitTask { 
                Name = task.Name,
                Description = task.Description,
                DueDate = task.DueDate,
                Status = task.Status
            };

            context.Tasks.Add(newTask);
            context.SaveChanges();
            return Ok(newTask);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public ActionResult Delete(int id)
        {
            var task = context.Tasks.Find(id);

            if (task != null)
            {
                context.Remove(task);
                context.SaveChanges();
            }

            return Ok(true);
        }
    }
}
