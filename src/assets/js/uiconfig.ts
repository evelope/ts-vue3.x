export const config = (ui: any) => {
    const obj = {
        device_id_jpath: ui[0].data[0].jpath, // 设备id
        device_model_id_jpath: ui[0].data[1].jpath, // 设备 model id
        device_model_name_jpath: ui[0].data[2].jpath, // 设备型号
        device_model_code_jpath: ui[0].data[3].jpath, // 设备型号
        device_type_id_jpath: ui[0].data[4].jpath, // 设备类型 id
        device_type_name_jpath: ui[0].data[5].jpath, // 设备类型
        device_class_id_jpath: ui[0].data[6].jpath, // 设备分类id
        device_class_name_jpath: ui[0].data[7].jpath, // 设备分类
        device_name_jpath: ui[0].data[8].jpath, // 设备名称
        alarm_host_code_jpath: ui[0].data[9].jpath, // 报警主机编号
        manufacturer_jpath: ui[0].data[10].jpath, // 生产厂家
        brand_jpath: ui[0].data[11].jpath, // 品牌
        system_id_jpath: ui[0].data[12].jpath, // 所属系统id
        system_name_jpath: ui[0].data[13].jpath, // 所属系统
        building_id_jpath: ui[0].data[14].jpath, // 所属建筑id
        building_name_jpath: ui[0].data[15].jpath, // 所属建筑
        floor_id_jpath: ui[0].data[16].jpath, // 所属楼层id
        floor_name_jpath: ui[0].data[17].jpath, // 所属楼层
        region_id_jpath: ui[0].data[18].jpath, // 所属分区id
        region_name_jpath: ui[0].data[19].jpath, // 所属分区
        location_jpath: ui[0].data[20].jpath, // 安装位置
        net_time_jpath: ui[0].data[21].jpath, // 入网时间
        upload_data_time_jpath: ui[0].data[22].jpath, // 最新上传数据时间
        intra_group_trans_id_jpath: ui[0].data[23].jpath, // 组内传输方式id
        intra_group_trans_name_jpath: ui[0].data[24].jpath, // 组内传输方式name
        trans_id_jpath: ui[0].data[25].jpath, // 传输方式id
        trans_name_jpath: ui[0].data[26].jpath, // 传输方式
        sending_frequency_jpath: ui[0].data[27].jpath, // 数据发送频率
        sensing_frequency_jpath: ui[0].data[28].jpath, // 采样频率
        sim_number_jpath: ui[0].data[29].jpath, // SIM卡号
        version_id_jpath: ui[0].data[30].jpath, // （协议卡）软件版本号
        dtu_mac_jpath: ui[0].data[31].jpath, // 主机地址
        dtu_link_way_jpath: ui[0].data[32].jpath, // 主机接入方式
        dtu_link_port_jpath: ui[0].data[33].jpath, // 接口
        dtu_enum_host_protocol_id_jpath: ui[0].data[34].jpath, // 报警主机传输协议id
        dtu_enum_host_protocol_name_jpath: ui[0].data[35].jpath, // 报警主机传输协议
        component_dtu_id_jpath: ui[0].data[36].jpath, // 传输设备
        loop_number_jpath: ui[0].data[37].jpath, // 回路号
        component_number_jpath: ui[0].data[38].jpath, // 部件号
        info_sense_jpath: ui[0].data[39].jpath, // 阈值信息
        upper_limit_jpath: ui[0].data[40].jpath, // 告警上限
        lower_limit_jpath: ui[0].data[41].jpath, // 告警下限
        enum_analog_type_jpath: ui[0].data[42].jpath, // 阈值类型id
        device_install_time_jpath: ui[0].data[43].jpath, // 安装日期
        is_need_protrol_jpath: ui[0].data[44].jpath, // 是否需要主机协议
        component_code_jpath: ui[0].data[45].jpath, // 部件编码"
        sense_latest_analog_jpath: ui[0].data[46].jpath, // 实时数据"
        device_online_status_jpath: ui[0].data[47].jpath, // 设备在线状态"
        device_status_jpath: ui[0].data[48].jpath, // 设备状态"
        sense_id_jpath: ui[0].data[49].jpath, // 阈值id"
        alarmer_dtu_id_jpath: ui[0].data[50].jpath, // 报警主机传输设备
    };
    return obj;
};
