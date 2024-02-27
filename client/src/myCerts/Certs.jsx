import styled from "styled-components";
const certs = [
  "https://firebasestorage.googleapis.com/v0/b/portfolio-8d5e6.appspot.com/o/UC-3189302e-06d6-4eaa-93b1-ae7b3a567ce4.jpg?alt=media&token=dd6e795f-4cad-41d0-b9da-ca1b2fef5637",
  "https://firebasestorage.googleapis.com/v0/b/portfolio-8d5e6.appspot.com/o/UC-4297df63-9252-4cab-8c3b-f500021e8f6c.jpg?alt=media&token=329ffdc2-c3ba-44ec-acd8-2a137a451663",
  "https://firebasestorage.googleapis.com/v0/b/portfolio-8d5e6.appspot.com/o/UC-7eabe3fc-8abb-4eb1-af83-072b371be9b4.jpg?alt=media&token=e93f7e78-cc6f-4ea8-913b-9031110e0b19",
  "https://firebasestorage.googleapis.com/v0/b/portfolio-8d5e6.appspot.com/o/Certificado%20Curso%20NR%2010%20-%20Luis%20Guilherme%20dos%20Anjos.pdf?alt=media&token=06e07e62-26d7-4a58-b68e-917e418216ae",
  "https://firebasestorage.googleapis.com/v0/b/portfolio-8d5e6.appspot.com/o/Certificado%20Curso%20NR%2035%20-%20Luis%20Guilherme%20dos%20Anjos.pdf?alt=media&token=01b1da01-e190-48c1-8990-a120d9b638ef",
];

const Certs = () => {
  console.log(certs);
  return (
    <Wrapper>
      {certs.map((e, i) => {
        return (
          <div key={i} className="certs_container">
            <img src={e} alt="certificates" />
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  .certs_container {
    margin: 0 auto;
    height: 50rem;
    width: 50rem;
    box-shadow: var(--shadow-2);
    margin-bottom: 5px;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export default Certs;
