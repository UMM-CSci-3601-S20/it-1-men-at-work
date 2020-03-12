package umm3601;

import java.util.Arrays;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import io.javalin.Javalin;
import umm3601.note.NoteController;
import umm3601.user.UserController;
import umm3601.viewer.ViewerController;

public class Server {

  static String appName = "Virtual Post-It";

  private static MongoDatabase database;

  public static void main(String[] args) {

    // Get the MongoDB address and database name from environment variables and
    // if they aren't set, use the defaults of "localhost" and "dev".
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");
    String databaseName = System.getenv().getOrDefault("MONGO_DB", "dev");

    // Setup the MongoDB client object with the information we set earlier
    MongoClient mongoClient = MongoClients.create(
      MongoClientSettings.builder()
      .applyToClusterSettings(builder ->
        builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
      .build());

    // Get the database
    database = mongoClient.getDatabase(databaseName);

    // Initialize dependencies
    UserController userController = new UserController(database);
    NoteController noteController = new NoteController(database);
    ViewerController viewerController = new ViewerController(database);
    //UserRequestHandler userRequestHandler = new UserRequestHandler(userController);

    Javalin server = Javalin.create().start(4567);

    // Simple example route
    server.get("hello", ctx -> ctx.result("Hello World"));

    // Utility routes
    server.get("api", ctx -> ctx.result(appName));

    // Get specific user
    server.get("api/users/:id", userController::getUser);

    server.delete("api/users/:id", userController::deleteUser);

    // Get specific note
    server.get("api/notes/:id", noteController::getNote);

    // List users, filtered using query parameters
    server.get("api/users", userController::getUsers);

    // List all notes for owner
    server.get("api/notes", noteController::getNotes);

    // List all notes for viewer
    server.get("api/viewers", viewerController::getNotes);

    // Add new user
    server.post("api/users/new", userController::addNewUser);





    server.exception(Exception.class, (e, ctx) -> {
      ctx.status(500);
      ctx.json(e); // you probably want to remove this in production
    });
  }
}
