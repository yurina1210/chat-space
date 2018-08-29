json.content   @message.content
json.image     @message.image.url
json.user_id   @message.user.id
json.user_name @message.user.name
json.id        @message.id
json.created_at format_posted_time(@message.created_at)
