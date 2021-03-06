package umm3601.note;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.regex;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.google.common.collect.ImmutableMap;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Sorts;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.mongojack.JacksonCodecRegistry;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;

/**
 * This controller is to manage requests for info about notes
 */
public class NoteController {

  static String bodyRegex = "^\\w+( +\\w+)*$";
  static String dateRegex = "^\\d{4}\\-\\d{1,2}\\-\\d{1,2}$";

  JacksonCodecRegistry jacksonCodecRegistry = JacksonCodecRegistry.withDefaultObjectMapper();

  private final MongoCollection<Note> noteCollection;

  public NoteController(MongoDatabase mongo) {
    jacksonCodecRegistry.addCodecForClass(Note.class);
    noteCollection = mongo.getCollection("notes").withDocumentClass(Note.class)
        .withCodecRegistry(jacksonCodecRegistry);
  }

  public void getNote(Context ctx) {
    String id = ctx.pathParam("id");

    Note note;

    try {
      note = noteCollection.find(eq("_id", new ObjectId(id))).first();
    } catch(IllegalArgumentException e) {
      throw new BadRequestResponse("The requested note id wasn't a legal Mongo Object ID.");
    }
    if (note == null) {
      throw new NotFoundResponse("The requested note was not found");
    } else {
      ctx.json(note);
    }

  }

  public void getNotes(Context ctx) {

    List<Bson> filters = new ArrayList<Bson>(); // start with a blank document

    // String sortBy = ctx.queryParam("sortby", "addDate"); //Sort by sort query param, default is name
    // String sortOrder = ctx.queryParam("sortorder", "desc");

    ctx.json(noteCollection.find(filters.isEmpty() ? new Document() : and(filters))
    // .sort(sortOrder.equals("desc") ?  Sorts.descending(sortBy) : Sorts.ascending(sortBy))
    .into(new ArrayList<>()));


  }

  public void addNotes(Context ctx) {

    Note newNote = ctx.bodyValidator(Note.class)
      .check((nte) -> nte.owner != null && nte.owner.length() > 0)
      .check((nte) -> nte.body != null && nte.body.length() > 0)
      // .check((nte) -> nte.addDate.toString().matches(dateRegex))
      // .check((nte) -> nte.expirationDate.toString().matches(dateRegex))
      .check((nte) -> nte.tag.matches("^(office hours|personal|class time)$"))
      .get();

    System.out.println(newNote);
    noteCollection.insertOne(newNote);
    ctx.status(201);
    ctx.json(ImmutableMap.of("id", newNote._id));

  }

  public void deleteNotes(Context ctx) {

  }

    /**
   * Utility function to generate the md5 hash for a given string
   *
   * @param str the string to generate a md5 for
   */
  public String md5(String str) throws NoSuchAlgorithmException {
    MessageDigest md = MessageDigest.getInstance("MD5");
    byte[] hashInBytes = md.digest(str.toLowerCase().getBytes(StandardCharsets.UTF_8));

    String result = "";
    for (byte b : hashInBytes) {
      result += String.format("%02x", b);
    }
    return result;
  }

}
