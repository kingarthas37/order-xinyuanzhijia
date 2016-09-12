'use strict';


module.exports = {

    indexFun: function () {

        this.container = $('.am-accordion');

        this.selectProductMethod();
        
        this.addCategory1();
        this.editCategory1();
        this.removeCategory1();
        this.moveCategory1Up();
        this.moveCategory1Down();

        this.addCategory2();
        this.editCategory2();
        this.removeCategory2();
        this.moveCategory2Up();
        this.moveCategory2Down();
    },
    
    //选择产品类型
    selectProductMethod() {
        let select = $('.select-product-method');
        
        this.productMethodId = select.val() ? parseInt(select.val()) : 0;
        
        select.change(function() {
            location.href = `/product-category?product-method-id=${this.value}`;
        });
    },

    //添加一级分类
    addCategory1: function () {

        let modal = $('#modal-category-1-add');
        let input = $('#input-category-1-add');
        let confirm = $('#modal-category-1-confirm-add');
        let productMethodId = this.productMethodId;
        
        $('.btn-category-1-add').click(function () {
            input.val('');
            modal.modal({
                relatedTarget: this
            });
        });

        confirm.click(function () {

            if (confirm.data('state')) {
                return false;
            }

            $.AMUI.progress.start();
            confirm.data('state', true);

            $.post({
                url: leanApp.api + 'classes/ProductCategory1',
                headers: leanAppHeader,
                data: JSON.stringify({
                    index: $('.am-accordion-item').length,
                    name: $.trim(input.val()) ? $.trim(input.val()) : '无分类名',
                    productMethodId
                }),
                success: function () {
                    $.AMUI.progress.done();
                    confirm.data('state', false);
                    modal.modal('close');
                    location.reload();
                }
            });

            return false;
        });
    },

    //编辑一级分类
    editCategory1: function () {

        let modal = $('#modal-category-1-edit');
        let input = $('#input-category-1-edit');
        let confirm = $('#modal-category-1-confirm-edit');
        let alert = $('#modal-alert');

        let productMethodId = this.productMethodId;
        let currentId = null;

        $('.edit-category-1').each(function () {
            $(this).click(function () {
                var text = $(this).parents('.am-accordion-title').find('strong').text();
                input.val($.trim(text));
                modal.modal({
                    relatedTarget: this
                });
                currentId = $(this).parents('.am-accordion-item').attr('data-id');
                return false;
            });
        });

        confirm.click(function () {

            if (confirm.data('state')) {
                return false;
            }

            $.AMUI.progress.start();
            confirm.data('state', true);

            $.get({
                url: leanApp.api + 'classes/ProductCategory1',
                headers: leanAppHeader,
                data: 'where={"category1Id":' + currentId + '}'
            }).done(data => {
                return $.ajax({
                    type: 'PUT',
                    url: `${leanApp.api}classes/ProductCategory1/${data.results[0].objectId}`,
                    headers: leanAppHeader,
                    data: JSON.stringify({
                        name: $.trim(input.val()),
                        productMethodId
                    })
                });
            }).done(() => {
                confirm.data('state', false);
                $.AMUI.progress.done();
                modal.modal('close');
                alert.modal({
                    onConfirm: ()=>location.reload()
                }).find('.am-modal-bd').text('编辑一级分类成功!');
            });

            return false;
        });

    },

    //删除一级分类
    removeCategory1: function () {

        let removeLink = $('.remove-category-1');
        let modal = $('#modal-category-1-remove');
        let alert = $('#modal-alert');

        //alert 关闭后移除暂存的实例，再次调用时重新初始化,可以解决2次调用同一代码的问题
        alert.on('closed.modal.amui', function () {
            $(this).removeData('amui.modal');
        });

        removeLink.each(function (i, n) {

            $(n).click(function () {

                let $this = $(this);

                modal.modal({
                    relatedTarget: this,
                    onConfirm: function () {

                        let item = $(this.relatedTarget);

                        if (item.data('state')) {
                            return false;
                        }

                        item.data('state', true);
                        $.AMUI.progress.start();

                        //删除一级分类需要判断该产品是否已使用该分类,所以不能使用api调用
                        $.get({
                            url: '/product-category/remove-category-1',
                            data: {
                                id: item.parents('.am-accordion-item').attr('data-id')
                            },
                            success: function (data) {

                                item.data('state', false);
                                $.AMUI.progress.done();
                                modal.modal('close');

                                if (!data.success) {
                                    alert.modal().find('.am-modal-bd').text(data.message);
                                } else {
                                    alert.modal({
                                        onConfirm: ()=> location.reload()
                                    }).find('.am-modal-bd').text('删除一级分类成功!');
                                }
                            }
                        });

                        return false;
                    }
                });
                return false;
            });

        });

    },

    //分类1上移
    moveCategory1Up: function () {

        let state = false;

        $('.moveup-category-1').each(function () {

            $(this).click(function () {

                let $this = $(this);
                let content = $this.parents('.am-accordion-item');
                let target = content.prev();
                let currentId = content.attr('data-id');
                let targetId = target.attr('data-id');
                let index = content.index();

                if (index === 0) {
                    return false;
                }

                if ($this.data('state')) {
                    return false;
                }

                $this.data('state', true);
                $.AMUI.progress.start();

                $.get({
                    url: '/product-category/move-category-1-up',
                    data: {
                        currentId: currentId,
                        targetId: targetId
                    }
                }).done(data => {
                    if (data.success) {
                        content.after(target);
                        $this.data('state', false);
                        $.AMUI.progress.done();
                    }
                });

                return false;
            });

        });


    },

    //分类1下移
    moveCategory1Down: function () {

        let list = $('.am-accordion-item');

        $('.movedown-category-1').each(function () {

            $(this).click(function () {

                let $this = $(this);
                let content = $this.parents('.am-accordion-item');
                let target = content.next();
                let currentId = content.attr('data-id');
                let targetId = target.attr('data-id');
                let index = content.index();

                if (index === list.length - 1) {
                    return false;
                }

                if ($this.data('state')) {
                    return false;
                }

                $this.data('state', true);
                $.AMUI.progress.start();

                $.get({
                    url: '/product-category/move-category-1-down',
                    data: {
                        currentId: currentId,
                        targetId: targetId
                    }
                }).done(data => {
                    if (data.success) {
                        content.before(target);
                        $this.data('state', false);
                        $.AMUI.progress.done();
                    }
                });

                return false;
            });

        });


    },


    //添加二级分类
    addCategory2: function () {

        let modal = $('#modal-category-2-add');
        let input = $('#input-category-2-add');
        let confirm = $('#modal-category-2-confirm-add');
        let content = null;
        let category1Id = null;


        $('.btn-category-2-add').each(function (i, n) {
            $(n).click(function () {
                content = $(this).parents('.am-accordion-item');
                category1Id = parseInt(content.attr('data-id'));
                input.val('');
                modal.modal({
                    relatedTarget: this
                });
            })
        });

        confirm.click(function () {

            if (confirm.data('state')) {
                return false;
            }

            $.AMUI.progress.start();
            confirm.data('state', true);

            let index = content.find('.category-2-list li').length;

            //添加二级分类,此处没用api是因为api save后再get无法获取到具体的category2Id等数据,所以只能通过ajax调用
            $.post({
                url: '/product-category/add-category-2',
                data: {
                    index: index,
                    name: $.trim(input.val()) ? $.trim(input.val()) : '无标题',
                    category1Id: category1Id
                }
            }).done(data => {
                $.AMUI.progress.done();
                confirm.data('state', false);
                modal.modal('close');
                
                let productMethodId = $('.select-product-method').val();
                let category1Id = content.data('id');
                
                content.find('.category-2-list').append(`
                        <li data-id="${data.id}">
                            <strong><a href="/product?product-method-id=${productMethodId}&category1-id=${category1Id}&category2-id=${data.id}" target="_blank">${data.name}</a></strong>
                            <span class="options">
                                <a class="edit-category-2" href="javascript:;">编辑</a>
                                <a class="moveup-category-2" href="javascript:;">上移</a>
                                <a class="movedown-category-2" href="javascript:;">下移</a>
                                <a class="remove-category-2" href="javascript:;">删除</a>
                            </span>
                        </li>
                `);

            });

            return false;
        });

    },

    //编辑二级分类
    editCategory2: function () {

        let modal = $('#modal-category-2-edit');
        let input = $('#input-category-2-edit');
        let confirm = $('#modal-category-2-confirm-edit');
        let alert = $('#modal-alert');

        let content = null;
        let category2Id = null;

        this.container.on('click', '.edit-category-2', function () {
            content = $(this).parents('li');
            input.val($.trim(content.find('strong').text()));
            category2Id = content.attr('data-id');
            modal.modal({
                relatedTarget: this
            });
            return false;
        });

        confirm.click(function () {

            if (confirm.data('state')) {
                return false;
            }

            $.AMUI.progress.start();
            confirm.data('state', true);


            $.get({
                url: leanApp.api + 'classes/ProductCategory2',
                headers: leanAppHeader,
                data: 'where={"category2Id":' + category2Id + '}'
            }).done(data => {
                return $.ajax({
                    type: 'PUT',
                    url: leanApp.api + 'classes/ProductCategory2/' + data.results[0].objectId,
                    headers: leanAppHeader,
                    data: JSON.stringify({
                        name: $.trim(input.val())
                    })
                });
            }).done(() => {
                confirm.data('state', false);
                $.AMUI.progress.done();
                modal.modal('close');
                alert.modal({
                    onConfirm: () => content.find('strong a').text(input.val())
                }).find('.am-modal-bd').text('编辑二级分类成功!');
            });

            return false;
        });

    },

    //删除二级分类
    removeCategory2: function () {

        let modal = $('#modal-category-2-remove');
        let alert = $('#modal-alert');

        //alert 关闭后移除暂存的实例，再次调用时重新初始化,可以解决2次调用同一代码的问题
        alert.on('closed.modal.amui', function () {
            $(this).removeData('amui.modal');
        });

        this.container.on('click', '.remove-category-2', function () {

            modal.modal({
                relatedTarget: this,
                onConfirm: function () {

                    let item = $(this.relatedTarget);
                    let content = item.parents('li');

                    if (item.data('state')) {
                        return false;
                    }

                    item.data('state', true);
                    $.AMUI.progress.start();

                    //删除一级分类需要判断该产品是否已使用该分类,所以不能使用api调用
                    $.get({
                        url: '/product-category/remove-category-2',
                        data: {
                            category1Id: content.parents('.am-accordion-item').attr('data-id'),
                            category2Id: content.attr('data-id')
                        },
                        success: function (data) {

                            item.data('state', false);
                            $.AMUI.progress.done();
                            modal.modal('close');

                            if (data.success) {
                                alert.modal({
                                    onConfirm: ()=>content.detach()
                                }).find('.am-modal-bd').text('删除二级分类成功!');
                            } else {
                                alert.modal().find('.am-modal-bd').text(data.message);
                            }

                        }
                    });

                    return false;
                }
            });
            return false;
        });
    },

    //分类2上移
    moveCategory2Up: function () {

        this.container.on('click', '.moveup-category-2', function () {

            let $this = $(this);
            let content = $(this).parents('li');
            let currentId = content.attr('data-id');
            let target = content.prev();
            let targetId = target.attr('data-id');
            let index = content.index();

            if (index === 0) {
                return false;
            }

            if ($this.data('state')) {
                return false;
            }

            $this.data('state', true);
            $.AMUI.progress.start();

            $.get({
                url: '/product-category/move-category-2-up',
                data: {
                    currentId: currentId,
                    targetId: targetId
                }
            }).done(data => {
                if (data.success) {
                    content.after(target);
                    $this.data('state', false);
                    $.AMUI.progress.done();
                }
            });

            return false;

        });


    },

    //分类2下移
    moveCategory2Down: function () {

        this.container.on('click', '.movedown-category-2', function () {

            let $this = $(this);
            let content = $(this).parents('li');
            let currentId = content.attr('data-id');
            let target = content.next();
            let targetId = target.attr('data-id');
            let index = content.index();

            if (index === content.parent().find('li').length - 1) {
                return false;
            }

            if ($this.data('state')) {
                return false;
            }

            $this.data('state', true);
            $.AMUI.progress.start();

            $.get({
                url: '/product-category/move-category-2-down',
                data: {
                    currentId: currentId,
                    targetId: targetId
                }
            }).done(data => {
                if (data.success) {
                    content.before(target);
                    $this.data('state', false);
                    $.AMUI.progress.done();
                }
            });

            return false;

        });


    }

};