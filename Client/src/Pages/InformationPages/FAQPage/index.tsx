import "./index.scss";

import React from "react";

const FAQPage = () => {
  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1 className="faq-title">Frequently Asked Questions</h1>

        <h2 className="faq-section-title">What is Veyshnoria?</h2>
        <div className="faq-section-content">
          <p>
            Veyshnoria is a fictional country that does not actually exist. This
            website is for demonstration purposes only and is not intended to
            provide accurate information about any real country or immigration
            process.
          </p>
        </div>
        <hr className="info-line" />

        <h2 className="faq-section-title">What is a visa?</h2>
        <div className="faq-section-content">
          <p>
            A visa is an official document that allows a person to enter and
            stay in a foreign country for a specified period of time. It is
            typically issued by the embassy or consulate of the country you are
            visiting and must be obtained before you travel.
          </p>
        </div>
        <hr className="info-line" />

        <h2 className="faq-section-title">
          How long does it take to get a visa?
        </h2>
        <div className="faq-section-content">
          <p>
            The processing time for a visa application can vary depending on a
            number of factors, such as the time of year and the volume of
            applications being processed. However, in general, you can expect it
            to take anywhere from a few days to a few weeks.
          </p>
        </div>
        <hr className="info-line" />

        <h2 className="faq-section-title">What is a residence permit?</h2>
        <div className="faq-section-content">
          <p>
            A residence permit is an official document that allows a person to
            stay in a foreign country for an extended period of time, typically
            longer than 90 days. It is typically obtained after entering the
            country on a visa and provides additional permissions and rights.
          </p>
        </div>
        <hr className="info-line" />

        <h2 className="faq-section-title">
          Can I work in Veyshnoria with a visa?
        </h2>
        <div className="faq-section-content">
          <p>
            It depends on the type of visa you have. Some visas allow for
            limited work, while others do not permit any work at all. Check with
            the Veyshnorian embassy or consulate for more information on the
            restrictions and permissions associated with your specific type of
            visa.
          </p>
        </div>
        <hr className="info-line" />

        <h2 className="faq-section-title">
          How do I apply for a visa or residence permit?
        </h2>
        <div className="faq-section-content">
          <p>
            You will need to contact the Veyshnorian embassy or consulate in
            your country to obtain the necessary application forms and
            information on the application process. Then you will need to
            register via this system. Be sure to provide all required
            documentation and follow all instructions carefully to ensure a
            smooth application process.
          </p>
        </div>

        <hr className="info-line" />

        <h2 className="faq-section-title">
          What is the purpose of this website?
        </h2>
        <div className="faq-section-content">
          <p>
            The purpose of this website is to make the process of applying for
            visas and residence permits in Veyshnoria as smooth and hassle-free
            as possible. With our online application system, you can create,
            submit, and manage your applications from the comfort of your own
            home. Whether you're a tourist looking to visit Veyshnoria for a
            short period or someone who's looking to stay long-term, our
            platform has got you covered.
          </p>
        </div>

        <hr className="info-line" />

        <h2 className="faq-section-title">
          Does this website contain any real information?
        </h2>
        <div className="faq-section-content">
          <p>
            This site is completely fictional and serves only as a pet project
            of a junior developer. Please note that any information provided on
            this site is not real and should not be used for official purposes.
          </p>
        </div>
        <p className="additional-info">
          For more information about visas, residence permits, and the
          application process, feel free to contact us.
        </p>
      </div>
    </div>
  );
};

export default FAQPage;
