import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import classes from "./FaqAccordion.module.css";
import faqPlusImage from "../images/faq-plus-icon.png";

const FaqAccordion = () => {
  const [items, setItems] = useState([
    {
      uuid: "a",
      heading: "Are there any fees for using your service?",
      content:
        "Currently our service is completely free to use. We do not charge any fees whatsoever.",
    },
    {
      uuid: "b",
      heading: "Can I edit my research paper before submitting it?",
      content: "lorem ipsum dolor site amtet",
    },
    {
      uuid: "c",
      heading: "How do I find reviewers for my research paper?",
      content: "lorem ipsum dolor sit amet",
    },
    {
      uuid: "d",
      heading: "How long does it take for reviewers to review my paper?",
      content: "lorem ipsum dolor sit amet",
    },
    {
      uuid: "e",
      heading: "How can I contact a reviewer?",
      content: "lorem ipsum dolor sit amet",
    },
    {
      uuid: "f",
      heading: "What kind of feedback can I expect from reviewers?",
      content: "lorem ipsum dolor sit amet",
    },
  ]);

  return (
    <Accordion allowZeroExpanded preExpanded={["a"]}>
      {items.map((item) => (
        <AccordionItem
          className={`${classes.accordionItem}`}
          key={item.uuid}
          uuid={item.uuid}
        >
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className={`${classes.faqTitleContainer}`}>
                <div>
                  <img
                    className={`${classes.faqTitleImage}`}
                    src={faqPlusImage}
                    alt=""
                  />
                </div>
                <p className={`${classes.faqTitle}`}>{item.heading}</p>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p className={`${classes.faqContent}`}>{item.content}</p>
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
