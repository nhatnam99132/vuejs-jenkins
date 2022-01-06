<template>
  <div>
    <h2>Quiz Conditionals Chart</h2>
    <Divider />
    <Scroll>
      <Form ref="dataForm" :model="dataForm" :rules="ruleData">
        <FormItem v-for="(item, index) in data" :key="index" prop="select">
          <Card icon="ios-options" :padding="0" shadow style="margin: 32px 0">
            <p slot="title">Câu {{ index + 1 }}: {{ item.question }}</p>
            <RadioGroup v-model="item.select" vertical >
              <Radio
                :label="item1"
                v-for="(item1, index) in item.options"
                :key="index"
                :disabled="submitForm"
              >
                <Icon type="social-apple"></Icon>
                <span>{{ item1 }}</span>
              </Radio>
              {{ item.select }}
              <Row v-if="submitForm">
                <Alert type="success" v-if="item.select === item.answer"
                  >Correct! You have selected correct answer.</Alert
                >
                <Alert
                  type="error"
                  v-else-if="item.select !== item.answer && item.select !== ''"
                  >Wrong! You have selected wrong answer</Alert
                >
                <Alert type="error" v-else>No Answer Provided</Alert>
              </Row>
            </RadioGroup>
          </Card>
        </FormItem>
      </Form>
    </Scroll>
    <Row>
        <Col span="12" push="14">
        <Button html-type="submit" size="large" type="primary" @click="reset"
          >Reset</Button
        >
      </Col>
      <Col span="12" push="5">
        <Button html-type="submit" size="large" type="success" @click="show" :disabled="submitForm"
          >Submit</Button
        >
      </Col>
    </Row>
    <Divider />
    <Alert type="info" v-if="submitForm">Your True Answer: {{ this.trueAnswer }} out of {{ this.data.length }}<br>Your Score: {{this.score}}</Alert>
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
        dataForm: {
            select:'',
        },
        ruleData : {
            select: [
                        { required: true, message: 'Please select in the answer', trigger: 'blur' }
                    ],
        },
        trueAnswer: 0,
      data: [
        {
          id: "1",
          question: "If she sold her car, she ....... much money for it.",
          options: [
            "would not get",
            "will not get",
            "did not get",
            "does not get",
          ],
          answer: "would not get",
          select: "",
        },
        {
          id: "2",
          question:
            "We might not stay at this hotel if Debbie ....... it to us.",
          options: [
            "did not recommend",
            "would not recommend",
            "would have recommended",
            "hadn't recommended",
          ],
          answer: "hadn't recommended",
          select: "",
        },
        {
          id: "3",
          question: "What would happen if you ....... go to work tomorrow?",
          options: ["did not", "would not", "will not", "do not"],
          answer: "did not",
          select: "",
        },
        {
          id: "4",
          question: "If the company offered me the job, I think I ....... it.",
          options: ["would not take", "will not", "do not take"],
          answer: "would not take",
          select: "",
        },
        {
          id: "5",
          question:
            "They're expecting us. They would be very disappointed if we .......",
          options: [
            "did not come",
            "would not come",
            "will not",
            "do not come",
          ],
          answer: "did not come",
          select: "",
        },
        {
          id: "6",
          question: "We would gladly buy the house if it ....... so small.",
          options: ["is not", "were not", "would not be", "had not been"],
          answer: "were not",
          select: "",
        },
        {
          id: "7",
          question: "If I ....... a $100 bill on the street, I would keep it.",
          options: ["find", "had found", "would find", "found"],
          answer: "found",
          select: "",
        },
        {
          id: "8",
          question:
            "It's good that Ann reminded me about Tom's birthday. I ....... if she hadn't reminded me.",
          options: [
            "would have forgotten",
            "would forget",
            "will forget",
            "had forgotten",
          ],
          answer: "would have forgotten",
          select: "",
        },
        {
          id: "9",
          question: "If I were you, I ....... him.",
          options: ["had married him", "will not", "do not", "would not"],
          answer: "would not",
          select: "",
        },
        {
          id: "10",
          question:
            "I'm sure Lee would lend you some money. I'd be surprised he ........",
          options: ["would refuse", "will refuse", "refused"],
          answer: "refused",
          select: "",
        },
        {
          id: "11",
          question:
            "I'd have sent you a postcard while I was on my vacation if I ....... your address.",
          options: [
            "rememberered",
            "remember",
            "would remember",
            "had remembered",
          ],
          answer: "had remembered",
          select: "",
        },
        {
          id: "12",
          question: "I wouldn't mind living in London if the weather .......",
          options: [
            "would be better",
            "is better",
            "were better",
            "had been better",
          ],
          answer: "were better",
          select: "",
        },
        {
          id: "13",
          question:
            "Many people would be out of work if that company ....... down.",
          options: ["closes", "closed", "will close", "close"],
          answer: "closed",
          select: "",
        },
        {
          id: "14",
          question:
            "Would George be angry if I .......his bicycle without asking?",
          options: ["would take", "will take", "took", "take"],
          answer: "took",
          select: "",
        },
        {
          id: "15",
          question:
            "I ....... you a cigarette if I had one, but I'm afraid I don't.",
          options: ["would give", "will give", "give"],
          answer: "would give",
          select: "",
        },
        {
          id: "16",
          question:
            "Jim got to the bus stop in time. If he ....... the bus, he would have been late for his interview.",
          options: ["missed", "would have missed", "misses", "had missed"],
          answer: "had missed",
          select: "",
        },
        {
          id: "17",
          question:
            "If someone ....... in here with a gun, I'd be very frightened.",
          options: ["will walk", "walked", "would walk", "walks"],
          answer: "walked",
          select: "",
        },
        {
          id: "18",
          question: "I'd help you if I ......., but I'm afraid I can't.",
          options: [
            "had been able to",
            "can",
            "could have been able to",
            "could",
          ],
          answer: "could",
          select: "",
        },
        {
          id: "19",
          question:
            "Ann gave me this ring. She ....... terribly upset if I lost it.",
          options: ["will be", "would be", "is", "would have been"],
          answer: "would be",
          select: "",
        },
        {
          id: "20",
          question:
            "I'm sure she ....... if you explained the situation to her.",
          options: [
            "would not get",
            "will not get",
            "did not get",
            "does not get",
          ],
          answer: "would understand",
          select: "",
        },
      ],
      submitForm: false,
      score: 0,

    };
  },
  methods: {
      show () {
          this.submitForm =  true;
          for(var i=0; i< this.data.length; i++){
              if(this.data[i].answer === this.data[i].select) {
                  this.trueAnswer++;
                  console.log("True Answer: "+this.data[i].answer + " - " + this.data[i].select);
                  console.log("Your Score: "+this.score);
              }
              
          }
          this.score = 10/this.data.length * this.trueAnswer;
            if(this.trueAnswer >= 8){
                this.$Modal.info({
                    title: 'Quiz Info',
                    content: `Your True Answer: ${this.trueAnswer} out of ${this.data.length}<br>Your Score: ${this.score}`
                })
            } else if(this.trueAnswer>=6.5) {
                this.$Modal.info({
                    title: 'Quiz Info',
                    content: `Your True Answer: ${this.trueAnswer} out of ${this.data.length}<br>Your Score: ${this.score}`
                })
            } else if(this.trueAnswer >=5){
                this.$Modal.info({
                    title: 'Quiz Info',
                    content: `Your True Answer: ${this.trueAnswer} out of ${this.data.length}<br>Your Score: ${this.score}`
                })
            } else {
                this.$Modal.info({
                    title: 'Quiz Info',
                    content: `Your True Answer: ${this.trueAnswer} out of ${this.data.length}<br>Your Score: ${this.score}`
                })
            }
            
            },
            reset() {
                this.$router.go();
            }
  },
};
</script>

<style scoped>
</style>