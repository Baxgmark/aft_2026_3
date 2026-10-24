<template>
<div>
    <h1>หัวข้อการประเมิน</h1>
    <form class="bg-blue-500">
        <div class="">
            <p>ชื่อหัวข้อ</p>
            <input v-model="form.name"   type="text"  placeholder="ชื่อหัวข้อ" />
        </div>
        <div>
            <p>รายละเอียด</p>
            <input v-model="form.detail"  type="text"  placeholder="รายละเอียด" />
        </div>
        <div>
            <p>URL</p>
            <input v-model="form.base_url"  type="text" placeholder="URL" />
        </div>
        <div>
            <p>น้ำหนัก</p>
            <input v-model="form.weight" type="number"  placeholder="น้ำหนัก" />
        </div>
        <div>
            <p>รูปแบบคะแนน</p>
            <select>
                <option v-for="t in types" :key="t.id" :value="t.id">{{ t.label }}</option>
            </select>
        </div>
        <button>เพิ่มหัวข้อ</button>
    </form>


    <div class=" bg-red-500">
        <h1>รายการทั้งหมด</h1>
        <div v-for="r in rows" :key="r.id"  class="">
            <input v-model="r.name" />
            <input v-model="r.detail"  />
            <input v-model="r.weight"  />
            <select>
                <option v-for="f in types" :key="f.id" :value="f.id">{{ f.label }}</option>
            </select>
            <div>
                <button @click="edit(r)">แก้ไข</button>
                <button @click="del(r)">ลบ</button>
            </div>
        </div>
    </div>        
    <p v-if="!rows.length">ยังไม่มีข้อมูล</p>
</div>
</template>

<script setup>
import { useCrud } from '../../lib';

const types = [
    {id: '1',label: '1-4 คะแนน'},
    {id: '2', label: 'มี / ไม่มี'}
]

const { rows, form, add, edit, del} = useCrud({
    add:'/api/addtopic',
    list:'/api/alltopic'
})
</script>