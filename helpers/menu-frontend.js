
const getMenuFrontEnd = (role ='USER_ROLE') => {

    
    const menu = [
        {
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                {titulo: 'Principal', url: '/'},
                {titulo: 'Gráfica', url: 'grafica1'},
                {titulo: 'Rxjs', url: 'rxjs'},
                {titulo: 'ProgressBar', url: 'progress'},
                {titulo: 'Promesas', url: 'promesas'}
            ]
        },
        
        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // {titulo: 'Usuario', url: 'usuario'},
                {titulo: 'Médico', url: 'medico'},
                {titulo: 'Hospital', url: 'hospital'},
                
            ]
        }
    ];

    if(role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({titulo: 'Usuario', url: 'usuario'})
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}