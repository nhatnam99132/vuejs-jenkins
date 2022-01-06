<template>
  <div>
    <h1>Login</h1>
    <Divider />
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input
          type="password"
          v-model="formInline.password"
          placeholder="Password"
        >
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')"
          >Login</Button
        >
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: "",
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
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
            .dispatch("AUTH/login", {
              username: this.formInline.user,
              password: this.formInline.password,
            })
            .then(() => {
              if (this.$store.state.AUTH.token !== null) {
                this.$Message.success("Login Success!");
                this.$store.state.AUTH.isLogin = true;
                this.$router.push("/");
              } else {
                this.$Message.error("Unauthorized!");
              }
            });
          //console.log('Token: '+ this.$store.state.AUTH.token);
        } else {
          this.$Message.error("Login Fail!");
        }
      });
    },
  },
};
</script>

<style scoped>
</style>