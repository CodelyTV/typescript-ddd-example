import { CourseName } from "../../../Shared/domain/Courses/CourseName";
import { NewCourseTwit } from "../../domain/NewCourseTwit";
import { NewCourseTwitError } from "../../domain/NewCourseTwitError";
import { TwitSender } from "../../domain/TwitSender";

export default class SendNewCourseTwit {
  constructor(private tweetSender: TwitSender) {}

  async run(courseName: CourseName): Promise<void> {
    const newCourseTweet = new NewCourseTwit(courseName);
    try {
      await this.tweetSender.send(newCourseTweet);
    } catch (error) {
      throw new NewCourseTwitError(newCourseTweet);
    }
  }
}
