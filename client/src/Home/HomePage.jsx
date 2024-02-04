/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";
import InfoBtn from "./Component/InfoBtn";
import loginImg from "../assets/login-img.svg";
const HomePage = () => {
  return (
    <Wrapper>
      <section className="sec_one">
        <div className="header_cont">
          <h1>LUIZ GUILHERME</h1>
          <InfoBtn />
        </div>
      </section>
      <section className="sec_two">
        <h1>Latest projects</h1>
        <div className="projects_container">
          <div className="img_container">
            <a href="https://onfrete.web.app">
              <div className="img_box">
                <img src="https://firebasestorage.googleapis.com/v0/b/portfolio-8d5e6.appspot.com/o/logo.png?alt=media&token=237973bd-ee1a-49ac-a2d2-b6c59dbe6305"></img>
              </div>
            </a>
            <div className="project_description">
              <h2>onFrete</h2>
              <p>
                OnFrete is my recent project where i intermediate business
                transactions. Unfortunately i can't share the code.
              </p>
            </div>
          </div>
          <div className="img_container allocate">
            <div className="project_description">
              <h2>Jobster</h2>
              <p>
                This project is very special to me, this one was one of the
                first projects that I worked on full stack with Node.js and
                javaScript in my course. The idea of Jobster is a "social media"
                like LinkedIn where users can post their jobs and apply. And
                here the code on GitHub{" "}
                <a href="https://github.com/Sinieghi/Jobster-back-end">
                  jobster
                </a>
              </p>
              <p>
                credits: <span>John Smilga</span>
              </p>
            </div>
            <a href="https://jobster-4ay2.onrender.com/">
              <div className="img_box">
                <img src="https://firebasestorage.googleapis.com/v0/b/portfolio-8d5e6.appspot.com/o/logo.svg?alt=media&token=2f3604a1-b0a4-4775-9b54-4de1da214cb4"></img>
              </div>
            </a>
          </div>
          <div className="img_container">
            <a href="https://sage-crumble-6d8f59.netlify.app/login">
              <div className="img_box">
                <img src={loginImg}></img>
              </div>
            </a>
            <div className="project_description">
              <h2>GIT USERS</h2>
              <p>
                GitHub users, using a github API to build this frontend here the{" "}
                <a href="https://github.com/Sinieghi/gitusers">code</a>
              </p>
              <p>
                credits: <span>John Smilga</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  min-height: 100vh;
  .sec_one {
    max-width: 100%;
    height: 100vh;
    background-image: url("https://firebasestorage.googleapis.com/v0/b/portfolio-8d5e6.appspot.com/o/pexels-sevenstorm-juhaszimrus-443383.jpg?alt=media&token=53c87685-8ede-4bd7-b467-a88c201178e4");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    .header_cont {
      position: absolute;
      bottom: 100px;
      left: 200px;
      column-gap: 30px;
    }

    h1 {
      color: var(--white);
      font-size: 40px;
    }
    .btn-group {
    }
  }
  .sec_two {
    height: fit-content;
    background-color: var(--color-cus-new-sec);
    padding: 5rem 10rem;
    h1 {
      text-align: center;
      font-size: 40px;
    }
    .projects_container {
      display: grid;
      .img_container {
        display: flex;
        width: 100%;
        gap: 30px;
        .img_box {
          width: 300px;
          height: 300px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .allocate {
        display: flex;
        justify-content: end;
      }
      .project_description {
        padding: 20px;
        width: 400px;
      }
    }
  }
  @media (max-width: 1030px) {
    .sec_one {
      .header_cont {
        left: 10px;
      }
    }
    .sec_two {
      .projects_container {
        .img_container {
          flex-direction: column;
        }
      }
      .allocate {
        display: grid !important;
        a {
          width: fit-content;
        }
        .project_description {
          grid-area: p;
        }
        .img_box {
          grid-area: a;
        }
        grid-template-areas: "a" "p";
      }
    }
  }
  @media (max-width: 655px) {
    .sec_two {
      padding: 5rem 0;
      .projects_container {
        width: 100%;
        .img_container {
          width: 100%;
        }
        .project_description {
          width: 100%;
          padding: 0;
        }
        .img_box {
          width: 100%;
        }
      }
    }
  }
`;
export default HomePage;
