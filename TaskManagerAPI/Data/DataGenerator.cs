using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Data
{
    public class DataGenerator
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new AppDbContext(serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>()))
            {
                if (context.Tasks.Any())
                {
                    return;
                }

                context.Tasks.AddRange(
                    new UnitTask
                    {
                        Name = "Task 1",
                        Description = "Description Task 1",
                        DueDate = DateTime.Now,
                        Status = Models.TaskStatus.Active
                    },
                    new UnitTask
                    {
                        Name = "Task 2",
                        Description = "Description Task 2",
                        DueDate = DateTime.Now,
                        Status = Models.TaskStatus.Completed
                    },
                    new UnitTask
                    {
                        Name = "Task 3",
                        Description = "Description Task 3",
                        DueDate = DateTime.Now,
                        Status = Models.TaskStatus.Active
                    });

                context.SaveChanges();
            }
        }


    }
}
