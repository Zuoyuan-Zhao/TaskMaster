using System;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;

namespace TaskMaster_Api.Models
{
    [DynamoDBTable("Tasks")]
    public class TaskEntry
    {
        [DynamoDBHashKey]
        public string Id { get; set; }

        [DynamoDBProperty]
        public string Title { get; set; }

        [DynamoDBProperty]
        public string Description { get; set; }

        [DynamoDBProperty]
        public DateTime DueDate { get; set; }

        [DynamoDBProperty]
        public Status Status { get; set; }

        [DynamoDBProperty]
        public string Priority { get; set; }

        [DynamoDBProperty]
        public DateTime CreatedDate { get; set; }

        [DynamoDBProperty]
        public DateTime ModifiedDate { get; set; }

        [DynamoDBProperty]
        public string AssignedTo { get; set; }

        [DynamoDBProperty]
        public string Notes { get; set; }

        [DynamoDBProperty]
        public List<string> Tags { get; set; }

        [DynamoDBVersion]
        public int? VersionNumber { get; set; }

        public Document ToDocument()
        {
            Document document = new Document
            {
                ["Id"] = this.Id,
                ["Title"] = this.Title,
                ["Description"] = this.Description,
                ["DueDate"] = this.DueDate,
                ["Status"] = this.Status.ToString(),
                ["Priority"] = this.Priority.ToString(),
                ["CreatedDate"] = this.CreatedDate,
                ["ModifiedDate"] = this.ModifiedDate,
                ["AssignedTo"] = this.AssignedTo,
                ["Notes"] = this.Notes,
                ["Tags"] = this.Tags
            };

            return document;
        }
    }
    public enum Status
    {
        New,
        InProgress,
        Completed,
        Cancelled
    }
}