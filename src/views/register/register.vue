<template>
  <div>
    <h1>Register</h1>
    <Divider />
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="80"
    >
      <FormItem label="Name" prop="name">
        <Input
          v-model="formValidate.name"
          placeholder="Enter your name"
        ></Input>
      </FormItem>
      <FormItem label="E-mail" prop="mail">
        <Input
          v-model="formValidate.mail"
          placeholder="Enter your e-mail"
        ></Input>
      </FormItem>
      <FormItem label="Address" prop="address">
        <Input type="text" v-model="formValidate.address"></Input>
      </FormItem>
      <FormItem label="Phone Number" prop="phoneNumber">
        <Input type="text" v-model="formValidate.phoneNumber"></Input>
      </FormItem>
      <FormItem label="Password" prop="passwd">
        <Input type="password" v-model="formValidate.passwd"></Input>
      </FormItem>
      <FormItem label="Confirm" prop="passwdCheck">
        <Input type="password" v-model="formValidate.passwdCheck"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')"
          >Submit</Button
        >
        <Button @click="handleReset('formValidate')" style="margin-left: 8px"
          >Reset</Button
        >
      </FormItem>
    </Form>
    <p>{{ formValidate }}</p>
  </div>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        if (this.formValidate.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formValidate.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.formValidate.passwd) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };

    return {
      formValidate: {
        name: "",
        mail: "",
        phoneNumer: "",
        passwd: "",
        passwdCheck: "",
        address: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur",
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
        passwd: [{ type: 'string', required: true, len:6, validator: validatePass, trigger: "blur" }],
        passwdCheck: [
          { type: 'string', required: true, len: 6, validator: validatePassCheck, trigger: "blur" },
        ],
        address: [
          {
            required: true,
            message: "Address cannot be empty",
            trigger: "blur",
          },
        ],
        phoneNumber: [
          {
            required: true,
            message: "Phone Number cannot be empty",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
         await this.$store
            .dispatch("AUTH/register", {
              username: this.formValidate.mail,
              password: this.formValidate.passwd,
              name: this.formValidate.name,
              address: this.formValidate.address,
              password_confirmation: this.formValidate.passwdCheck,
              phoneNumber: this.formValidate.phoneNumber,
            })
            .then(() => {
                if(this.$store.state.AUTH.isRegister){
                  this.$Message.success("Register Success! Please Login to continue the application");
                this.$router.push("/login");
                }
                else {
                  this.$Message.error("Register Fail! Please Try Again");
                }
            });
          //console.log('Token: '+ this.$store.state.AUTH.token);
        } else {
          this.$Message.error("Register Fail! Please Try Again");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
  },
};
</script>

<style scoped>
</style>