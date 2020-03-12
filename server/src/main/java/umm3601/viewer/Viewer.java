package umm3601.viewer;

import org.mongojack.Id;
import org.mongojack.ObjectId;

public class Viewer {

  @ObjectId @Id
  public String _id;

  public String email;

}
