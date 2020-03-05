package umm3601.note;

import static com.mongodb.client.model.Filters.eq;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.collect.ImmutableMap;
import com.mockrunner.mock.web.MockHttpServletRequest;
import com.mockrunner.mock.web.MockHttpServletResponse;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;
import io.javalin.http.util.ContextUtil;
import io.javalin.plugin.json.JavalinJson;

/**
 * Tests for NoteController
 */

 public class NoteControllerSpec {

  MockHttpServletRequest mockReq = new MockHttpServletRequest();
  MockHttpServletResponse mockRes = new MockHttpServletResponse();

  private NoteController noteController;

  private ObjectId rachelsId;

  static MongoClient mongoClient;
  static MongoDatabase db;

  static ObjectMapper jsonMapper = new ObjectMapper();

  @BeforeAll
  public static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(
    MongoClientSettings.builder()
    .applyToClusterSettings(builder ->
    builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
    .build());

    db = mongoClient.getDatabase("test");
  }

  @BeforeEach
  public void setupEach() throws IOException {

    // Reset our mock request and response objects
    mockReq.resetAll();
    mockRes.resetAll();

    // Setup database
    MongoCollection<Document> userDocuments = db.getCollection("notes");
    userDocuments.drop();
    List<Document> testUsers = new ArrayList<>();
    testUsers.add(Document.parse("{\n" +
    "                    owner: \"Jack\",\n" +
    "                    body: \"I will be out of town due to my dog has been severely sick.\",\n" +
    "                    addDate: \"03-20-2020\",\n" +
    "                    expirationDate: \"03-21-2020\",\n" +
    "                    tag: \"office hours\", \n" +
    "                }"));
    testUsers.add(Document.parse("{\n" +
    "                    owner: \"Josh\",\n" +
    "                    body: \"My car is stuck in the ditch my office hours are canceled.\",\n" +
    "                    addDate: \"01-1-2020\",\n" +
    "                    expirationDate: \"01-2-2020\",\n" +
    "                    tag: \"office hours\", \n" +
    "                }"));
    testUsers.add(Document.parse("{\n" +
    "                    owner: \"Trent\",\n" +
    "                    body: \"I will be gone for the rest of the week, I have a track meet.\",\n" +
    "                    addDate: \"02-24-2020\",\n" +
    "                    expirationDate: \"02-28-2020\",\n" +
    "                    tag: \"class\", \n" +
    "                }"));

    rachelsId = new ObjectId();
    BasicDBObject sam = new BasicDBObject("_id", rachelsId);
    sam = sam.append("owner", "Rachel")
      .append("body", "I will be out of the office for faculty meeting and will not be in office hours")
      .append("addDate", "03-06-2020")
      .append("expirationDate", "03-06-2020");


    userDocuments.insertMany(testUsers);
    userDocuments.insertOne(Document.parse(sam.toJson()));

    noteController = new NoteController(db);
  }


  @AfterAll
  public static void teardown() {
    db.drop();
    mongoClient.close();
  }

  @Test
  public void getAllNotes() throws IOException {
     // Create our fake Javalin context
     Context ctx = ContextUtil.init(mockReq, mockRes, "api/notes");
     noteController.getNotes(ctx);

     assertEquals(200, mockRes.getStatus());

     String result = ctx.resultString();
     long countNumber = db.getCollection("notes").countDocuments();
     System.out.println(countNumber);
     assertEquals(countNumber, JavalinJson.fromJson(result, Note[].class).length);
 }


}
