using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using TaskMaster_Api.Models;

namespace TaskMaster_Api.DaoLayer
{

public class TaskDao
    {
        private readonly AmazonDynamoDBClient _client;
        private const string TableName = "Tasks";

        public TaskDao(AmazonDynamoDBClient client)
        {
            _client = client;
        }

        public async Task AddTaskAsync(TaskEntry task)
        {
            Table table = Table.LoadTable(_client, TableName);
            var document = task.ToDocument();
            await table.PutItemAsync(document);
        }

        public async Task<List<TaskEntry>> GetTasksAsync()
        {
            var table = Table.LoadTable(_client, TableName);
            var search = table.Scan(new ScanOperationConfig());
            var tasks = new List<TaskEntry>();

            do
            {
                var documents = await search.GetNextSetAsync();
                tasks.AddRange(documents.Select(doc => ToTaskEntry(doc)));
            } while (!search.IsDone);

            return tasks;
        }

        public async Task<TaskEntry> GetTaskAsync(string taskId)
        {
            var table = Table.LoadTable(_client, TableName);
            var document = await table.GetItemAsync(taskId);
            return ToTaskEntry(document);
        }

        public async Task UpdateTaskAsync(TaskEntry task)
        {
            var table = Table.LoadTable(_client, TableName);
            var document = task.ToDocument();
            await table.UpdateItemAsync(document);
        }

        public async Task DeleteTaskAsync(string taskId)
        {
            var table = Table.LoadTable(_client, TableName);
            await table.DeleteItemAsync(taskId);
        }

        public TaskEntry ToTaskEntry(Document document)
        {
            if (document == null)
            {
                return new TaskEntry();
            }

            Enum.TryParse(document["Status"], out TaskStatus status);

            return new TaskEntry
            {
                Id = document["Id"],
                Title = document["Title"],
                Description = document["Description"],
                DueDate = DateTime.Parse(document["DueDate"]),
                Status = (Status)status,
                Priority = document.ContainsKey("Priority") ? document["Priority"] : null,
                CreatedDate = DateTime.Parse(document["CreatedDate"]),
                ModifiedDate = DateTime.Parse(document["ModifiedDate"]),
                AssignedTo = document.ContainsKey("AssignedTo") ? document["AssignedTo"] : null,
                Notes = document.ContainsKey("Notes") ? document["Notes"] : null,
                Tags = document.ContainsKey("Tags") ? document["Tags"].AsListOfString() : new List<string>(),
                VersionNumber = int.Parse(document["Version"])
            };
        }
    }

}
