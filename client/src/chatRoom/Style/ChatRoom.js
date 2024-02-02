import styled from "styled-components";

export const Wrapper = styled.main`
  height: 100vh;
  .aside_content {
    box-shadow: var(--shadow-1);
    min-width: 35rem;
    z-index: 2;
    padding: 1rem;
    background-color: var(--white);
    h2 {
      font-size: 2rem;
      color: var(--yellow-1);
    }
  }
  .chat_aside-container {
    display: flex;
    height: 80vh;
  }

  .conversation {
    width: 100%;
    background-color: var(--color-cus-new-sec);
    padding: 3rem;
    overflow-y: scroll;
    .name,
    .date {
      position: absolute;
      font-size: 0.9rem;
    }
    .date {
      top: 3px;
      right: 3px;
    }
    .name {
      left: 3px;
      top: 3px;
    }
    .speak {
      position: relative;
      margin: 2rem 0;
      padding: 2rem;
      width: 30rem;
      background-color: var(--white);
      border-radius: 3px;
      box-shadow: var(--shadow-2);
      p {
        font-size: 1.4rem;
      }
    }
  }
  .connection-list {
    overflow-y: unset;
  }
  .input_box {
    box-shadow: var(--shadow-1);
    background-color: var(--white);
    position: relative;
    form {
      padding: 5rem 10rem;
      display: flex;
      align-items: center;
    }
    textarea {
      height: 3.2rem;
      margin: 0;
      width: 100%;
      border-bottom-left-radius: 50px;
      border-top-left-radius: 50px;
      color: var(--grey-900);
    }
    textarea {
      border: transparent;
      box-shadow: var(--shadow-6);
      background-color: transparent;
      align-content: end;
      padding: 1rem;
    }
    textarea:focus {
      outline-style: groove;
    }
    .submit_message {
      padding: 1.35rem;
      font-size: 1.6rem;
      letter-spacing: 2px;
      font-family: "Courier New", Courier, monospace;
      font-weight: 200;
      background-color: var(--grey-500);
      color: var(--white);
      z-index: 1;
      margin-left: 0rem;
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
    }
  }
  .contact-container {
    display: grid;
    row-gap: 1rem;

    .chat-open {
      height: 40rem;
      .title {
        color: var(--yellow-org);
      }
    }

    .connection-list {
      background-color: var(--primary-blue-200);
      .title {
        font-size: 1.2rem;
        color: var(--primary-300);
      }
      .block_status-btn {
        background-color: var(--clr-primary-red-3);
        color: var(--white);
      }
    }

    .blocklist-container {
      background-color: var(--red-light);
      .title {
        font-size: 1.2rem;
        color: var(--clr-primary-red-6);
      }
    }

    .connection-list,
    .blocklist-container {
      height: 30rem;
    }
    ul {
      height: 100%;
      overflow-y: scroll;
      -ms-overflow-style: thin;
      scrollbar-width: thin;
      position: relative;
      padding: 2rem;
      li {
        margin: 3px 0;
        cursor: pointer;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        column-gap: 1rem;
        width: fit-content;
        padding: 3px;
      }
      .new-contact {
        position: absolute;
      }
      .title {
        font-size: 1.2rem;
      }
      .empty-conversation {
        a {
          color: var(--red-org);
        }
      }
      .open_blocklist-content,
      .open_contact-content {
        padding: 5px;
        color: var(--white);
        position: absolute;
        right: 2px;
        top: 2px;
      }
      .open_blocklist-content {
        background-color: var(--clr-primary-red-2);
      }
      .open_contact-content {
        background-color: var(--primary-blue-300);
      }
      .list-container,
      .blocklist {
        margin: 3px 0;
        box-shadow: var(--shadow-1);
        background-color: var(--white);
        padding: 1px;
        display: flex;
        justify-content: space-between;
        position: relative;
      }
    }
    .close_and-block-container {
      display: grid;
      row-gap: 2px;
      position: relative;
      #cl {
        justify-self: end;
      }
    }
    .block_status-btn {
      font-size: 0.8rem;
      height: fit-content;
      width: fit-content;
      padding: 5px;
      letter-spacing: 1px;
    }
  }

  .show_contact-trigger {
    display: none;
    background-color: var(--yellow-1);
    position: absolute;
    left: 2rem;
    top: 15rem;
    width: 8rem;
    height: 4rem;
    z-index: 1;
  }
  .close {
    position: absolute;
    top: 0;
    right: 0;
  }

  .connection-container {
    border: 0.1px solid var(--grey-900);
    padding: 4px;
  }

  .img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .image_cont {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: var(--shadow-1);
    h1 {
      font-size: 1.5rem;
    }
  }
  .target {
    background-color: var(--eld-rng-1);
  }
  .confirm-action {
    background-color: var(--dark-bl);
  }
  .cancel-btn {
    background-color: var(--primary-200);
  }
  .cancel-btn,
  .confirm-action {
    width: 100%;
    height: 4rem;
  }

  .user_list {
    padding: 10px 15px;
    border: transparent;
    background-color: var(--eld-rng-1);
    margin: 5px;
    border-radius: 3px;
  }
  @media (max-width: 720px) {
    form {
      padding: 5rem 0 !important;
    }
    .btn_hover-scale,
    .submit_message {
      margin: 0 !important;
    }
    .aside_content {
      position: fixed;
      left: 0;
      top: 65px;
      display: none;
      opacity: 0;
      visibility: hidden;
      transform: translateX(-100%);
      transition: all 0.2s ease-in-out;
    }
    .show_aside-content {
      display: grid;
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
    }
    #cl {
      z-index: 10;
    }
  }
  @media (max-height: 800px) {
    .aside_content {
      overflow-y: scroll;
    }
    .input_box {
      padding: 0;
    }
  }
`;
