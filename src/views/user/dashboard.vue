<template>
    <div>
        <h2>User Profile</h2>
         <Row>
             <Col push="8">
                <img src="http://localhost:8081/ApiAuth/public/storage/users/default.png" height="200px" alt="">
             </Col>
         </Row>
        <Table border :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
            <Button type="success" size="small" @click="remove(index)">Update</Button>
        </template>
    </Table>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                columns12: [
                    {
                        title: 'Name',
                        slot: 'name'
                    },
                    {
                        title: 'Email',
                        key: 'email'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                     {
                        title: 'PhoneNumber',
                        key: 'phoneNumber'
                    },
                     {
                        title: 'Created At',
                        key: 'created_at'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                data6: [this.$store.state.AUTH.user],
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Email: ${this.data6[index].email}<br>Address: ${this.data6[index].address}<br>Phone Number: ${this.data6[index].phoneNumber}<br>Created at: ${this.data6[index].created_at}`
                })
            },
            remove (index) {
                this.$Modal.info({
                    title: 'User Edit',
                    content: `Name：${this.data6[index].name}<br>Email: ${this.data6[index].email}<br>Address: ${this.data6[index].address}<br>Phone Number: ${this.data6[index].phoneNumber}<br>Created at: ${this.data6[index].created_at}`
                })
            }
        },
        created () {
             this.$store
            .dispatch("AUTH/userProfile")
            .then(() => {
              //console.log("Token: "+this.$store.state.AUTH.token);
              //console.log("Token sau khi logout: "+this.$store.state.AUTH.token);
            });
        },
    }
</script>

<style scoped>

</style>