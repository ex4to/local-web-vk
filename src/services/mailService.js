class MailService {
  async uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);
    const reqOptions = {
      method: "POST",
      body: formData,
    };
    try {
      const { foo } = await fetch(
        "http://localhost:3500/api/v1/postjson",
        reqOptions
      ).then((res) => res.json());
      return foo;
    } catch (err) {
      console.log(err);
    }
  }

  async loadFile() {
    try {
      return await fetch("http://localhost:3500/api/v1/getjson").then((res) =>
        res.json()
      );
    } catch (err) {
      console.log(err);
    }
  }

  async makeCheckMails(mails) {
    await fetch("http://localhost:3500/api/v1/makeChecked", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mails),
    }).then((res) => res.json());
  }

  async makeUncheckMails(mails) {
    await fetch("http://localhost:3500/api/v1/makeUnchecked", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mails),
    }).then((res) => res.json());
  }
}

export default new MailService();
