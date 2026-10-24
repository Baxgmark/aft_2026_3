<template>
<div>
    <h1>หัวข้อการประเมิน</h1>
    <form class="bg-blue-500">
        <div class="">
            <p>ชื่อหัวข้อ</p>
            <input placeholder="ชื่อหัวข้อ" />
        </div>
        <div>
            <p>รายละเอียด</p>
            <input placeholder="รายละเอียด" />
        </div>
        <div>
            <p>URL</p>
            <input placeholder="URL" />
        </div>
        <div>
            <p>น้ำหนัก</p>
            <input placeholder="น้ำหนัก" />
        </div>
        <div>
            <p>รูปแบบคะแนน</p>
            <select>
                <option></option>
            </select>
        </div>
        <button>เพิ่มหัวข้อ</button>
    </form>
    <div class=" bg-red-500">
        <h1>รายการทั้งหมด</h1>
        <div>
        <div>
            <p>ชื่อหัวข้อ</p>
            <input placeholder="ชื่อหัวข้อ" />
        </div>
        <div>
            <p>รายละเอียด</p>
            <input placeholder="รายละเอียด" />
        </div>
        <div>
            <p>URL</p>
            <input placeholder="URL" />
        </div>
        <div>
            <p>น้ำหนัก</p>
            <input placeholder="น้ำหนัก" />
        </div>
        <div>
            <p>รูปแบบคะแนน</p>
            <select>
                <option></option>
            </select>
        </div>
            <div>
                <button>แก้ไข</button>
                <button>ลบ</button>
            </div>
        </div>
    </div>        
    <p>ยังไม่มีข้อมูล</p>
</div>
</template>

<script setup>

</script>