package umm3601.note;

import java.sql.Date;

import org.mongojack.Id;
import org.mongojack.ObjectId;

public class Note {

  @ObjectId @Id
  public String _id;

  public String owner;
  public String body;
  // public Date addDate;
  // public Date expirationDate;
  public String tag;

}
