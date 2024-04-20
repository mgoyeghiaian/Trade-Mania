### Chats Page Branch

#### Technologies Used
- Ionic/Angular
- Socket.IO

#### Key Features
- Real-time updates
- List styling
- Responsive design
- Conversation management

#### Schema for Message
Update messages in real time using the Mongoose schema:
- **Fields**: `text` (String), `isIncoming` (Boolean), `isOnline` (Boolean), `time` (default: Date.now), `contactName` (String), `iconImage` (String)
- **Timestamps**: Automatically generated for creation and update.

#### Chat Routes
Manage chat interactions using these API routes:
- **GET** `/` to retrieve messages
- **POST** `/` to create a new message
- **PATCH** `/:id` to update an existing message
- **DELETE** `/:id` to remove a message

#### Matched Users Routes
Manage matched users through:
- **GET** `/` to fetch matched users
- **POST** `/` to add a new matched user
- **PATCH** `/updateStatus` to update a user's online status

### Feedback
Explore the repository for implementation details. Feedback and suggestions are welcome!

### Contact
For any further questions or inquiries, please don't hesitate to contact.
