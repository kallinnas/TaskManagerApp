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

        [HttpGet("Status")]
        public ActionResult GetByStatus(int status)
        {
            return Ok(context.Tasks.Where(task => task.Status == (Models.TaskStatus)status).ToList());
        }

        [HttpPost]
        public ActionResult Add(UnitTaskDto task)
        {
            var newTask = new UnitTask
            {
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
            var task = GetTask(id);

            if (task != null)
            {
                context.Remove(task);
                context.SaveChanges();
            }

            return Ok(true);
        }

        [HttpPut]
        [Route("{id:int}")]
        public ActionResult Update(int id, UnitTaskDto task)
        {
            var existingTask = GetTask(id);

            if (existingTask == null)
            {
                return Ok(false);
            }

            existingTask.Name = task.Name;
            existingTask.Description = task.Description;
            existingTask.DueDate = task.DueDate;
            existingTask.Status = task.Status;

            context.SaveChanges();
            return Ok(true);
        }

        [HttpGet]
        [Route("{id:int}")]
        public ActionResult Get(int id)
        {
            var task = GetTask(id);

            if (task == null)
            {
                return Ok(null);
            }

            return Ok(task);
        }

        private UnitTask? GetTask(int id)
        {
            return context.Tasks.Find(id);
        }
    }
}
