# Chats Page Project

## Technologies Used

- **Ionic/Angular**: Leveraging the latest Ionic framework integrated with Angular for building a dynamic mobile and web application.
- **Socket.IO**: Utilized for real-time, bi-directional communication between web clients and servers.
- **Node.js**: Server-side JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.
- **MongoDB**: NoSQL database used for high volume data storage.

## Key Features

- **Real-time updates**: Utilizes WebSocket technology via Socket.IO to provide immediate updates across user interfaces.
- **List styling**: Custom list designs that enhance the visual layout and user interaction.
- **Responsive design**: Fully responsive web design that ensures a seamless experience on both desktop and mobile devices.
- **Conversation management**: Advanced features to manage user conversations efficiently.

## Schema for Message

### Fields

- **text**: String - Stores the message text.
- **isIncoming**: Boolean - Indicates if the message is incoming.
- **isOnline**: Boolean - Reflects the online status of the sender at the time of the message.
- **time**: Date - Stores the time when the message was sent. Default value is `Date.now()`.
- **contactName**: String - Name of the contact who sent the message.
- **iconImage**: String - URL or path to the sender’s profile icon.

### Timestamps

- Automatically generated timestamps for creation and update dates.

## API Routes

### Chat Routes

Manage chat interactions using these API routes:

- **GET /**: Retrieves a list of messages.

  - **Usage**: `GET /messages`
  - **Response**: Returns an array of message objects.

- **POST /**: Creates a new message.

  - **Usage**: `POST /messages`
  - **Body**: `{ "text": "Hello", "isIncoming": true, "contactName": "John Doe", "iconImage": "/path/to/image" }`
  - **Response**: Returns the created message object.

- **PATCH /:id**: Updates an existing message.

  - **Usage**: `PATCH /messages/:id`
  - **Body**: `{ "text": "Updated message text" }`
  - **Response**: Returns the updated message object.

- **DELETE /:id**: Removes a message.
  - **Usage**: `DELETE /messages/:id`
  - **Response**: Returns a status message indicating success or failure.

### Matched Users Routes

Manage matched users through the following routes:

- **GET /**: Fetches a list of matched users.

  - **Usage**: `GET /matched-users`
  - **Response**: Returns an array of matched user objects.

- **POST /**: Adds a new matched user to the database.

  - **Usage**: `POST /matched-users`
  - **Body**: `{ "name": "Jane Doe", "profilePicture": "/path/to/picture", "isOnline": true }`
  - **Response**: Returns the added matched user object.

- **PATCH /updateStatus**: Updates the online status of a matched user.
  - **Usage**: `PATCH /matched-users/updateStatus`
  - **Body**: `{ "userId": "user123", "isOnline": false }`
  - **Response**: Returns the updated matched user object.

## Feedback

Explore the repository for implementation details. Feedback and suggestions are welcome!

## Contact

For any further questions or inquiries, please don't hesitate to [contact us](mailto:email@example.com).
