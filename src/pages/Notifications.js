import React, { useState } from "react";
import NotificationsTabTitle from "../components/NotificationsTabTitle";
import SingleNotificationItem from "../components/SingleNotificationItem";
import classes from "./Notifications.module.css";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

function Notifications() {
  // set Docuement title
  useDocumentTitle("Puplier | Notifications");

  const [notifications, setNotifications] = useState({
    status: 200,
    notifications: [
      {
        type: "edit_request",
        read: false,
        author: "John Doe",
        author_profile_picture: "https://picsum.photos/id/53/300",
        article_id: 2345,
        message:
          "John Doe requested edit access to your article, 'Neural Networks for Natural Language Processing'",
        comment:
          "I would like to make some edits to this article as it contains some inaccuracies. I have a background in natural language processing and I believe I can make some improvements to the article.",
      },
      {
        type: "comment",
        read: true,
        author: "Jane Doe",
        author_profile_picture: "https://picsum.photos/id/54/300",
        article_id: 2345,
        message:
          "Jane Doe commented on your article, 'Neural Networks for Natural Language Processing'",
        comment:
          "I'm really interested in learning more about how neural networks are used for natural language processing. It's a fascinating topic and I'm excited to read more about it!",
      },
      {
        type: "edit_accepted",
        read: true,
        author: "Marie Edison",
        author_profile_picture: "https://picsum.photos/id/55/300",
        article_id: 2345,
        message:
          "Marie Edison accepted your edit request  to the article, 'Neural Networks for Natural Language Processing'",
      },
      {
        type: "edit_declined",
        read: false,
        author: "Edward John",
        author_profile_picture: "https://picsum.photos/id/56/300",
        article_id: 2345,
        message:
          "Edward John declined your edit request  to the article, 'Neural Networks for Natural Language Processing'",
        comment:
          "The changes you suggested do not fully align with the purpose of this article. The purpose of this article is to provide a general overview of the use of neural networks in natural language processing, and your suggested changes focus more on the specific details of a particular implementation.",
      },
      {
        type: "edit_revoked",
        read: false,
        author: "Marie Edison",
        author_profile_picture: "https://picsum.photos/id/57/300",
        article_id: 2345,
        message:
          "Marie Edison revoked your edit access  to the article, “Neural Networks for Natural Language Processing”. ",
      },
      {
        type: "suggestion_submitted",
        read: true,
        author: "Edward John",
        author_profile_picture: "https://picsum.photos/id/58/300",
        article_id: 2345,
        message:
          "Edward John sent a suggestion to your article, 'Neural Networks for Natural Language Processing'.  Review the changes to accept or decline.",
      },
      {
        type: "suggestion_merged",
        read: true,
        author: "Xavier John",
        author_profile_picture: "https://picsum.photos/id/59/300",
        article_id: 2345,
        message:
          "Xavier John merged your suggestions to his article, 'Neural Networks for Natural Language Processing'.  Click to read the new article here.",
      },
      {
        type: "suggestion_declined",
        read: false,
        author: "Xavier John",
        author_profile_picture: "https://picsum.photos/id/60/300",
        article_id: 2345,
        message:
          "Xavier John declined your suggestions to his article, “Neural Networks for Natural Language Processing”.  Here is why.",
        comment:
          "After careful consideration, I have decided to decline your request. The changes you proposed didn't fit with the overall structure and content of the article. Additionally, some of the changes you proposed may have introduced inaccuracies or changed the original meaning of the text. I appreciate your enthusiasm for the article, but I believe that it is best to keep the article as is.",
      },
    ],
  });

  return (
    <React.Fragment>
      <NotificationsTabTitle />
      <div className={classes.notificationListContainer}>
        {notifications.notifications.map((notification, key) => (
          <SingleNotificationItem notification={notification} key={key} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default Notifications;
