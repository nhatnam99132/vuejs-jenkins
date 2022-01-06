<template>
    <div>
       <Row justify="center" align="middle">
           <Col span="24" push="10">
                <h2> 404 - Not found</h2>
           </Col>
       </Row>
       <Row>
           <Col justify="center" align="middle">
             <Button type="primary" @click="back">Back to Home</Button>
           </Col>
       </Row>
    </div>
</template>

<script>
    export default {
        methods: {
            back() {
                this.$router.push('/');
            }
        },
    }
</script>

<style scoped>

</style>