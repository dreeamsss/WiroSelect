class WiroSelect {
  _selectedname;
  _selectedvalue;
  _selectedIndex;

  _selectWrapper;
  _selectBtn;
  _selectList;

  constructor(select, options) {
    const defaultOptions = {
      selectedClass: "wiroSelect__item--selected",
      slideToggleTiming: 150,
    };

    this.options = { ...defaultOptions, ...options };

    this.select = $(select);
    this.selectOptions = $(this.select).find("option");

    this._selectedname = this.select.attr("name");

    this.render();
    this.events();
  }

  // get properties

  get value() {
    return this._selectedvalue;
  }

  get name() {
    return this._selectedname;
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  // elements rendering
  render() {
    this.select.addClass("wiroSelect__hidden");

    this.createElems();

    $(this.selectOptions).each((idx, item) => {
      const selectItem = $(
        '<div class="wiroSelect__item" role="option"></div>'
      );

      selectItem
        .text($(item).text())
        .attr("data-index", idx)
        .attr("data-value", $(item).val())
        .attr("aria-selected", $(item).is(":selected"));

      if ($(item).is(":selected")) {
        selectItem.addClass(this.options.selectedClass);

        this._selectBtn.text($(item).text());

        this._selectedIndex = idx;
        this._selectedvalue = $(item).val();
      }

      $(this._selectList).append(selectItem);
    });

    this._selectWrapper.append(this._selectBtn).append(this._selectList);
    $(this.select).after(this._selectWrapper);
  }

  createElems() {
    this._selectWrapper = $('<div class="wiroSelect"></div>');
    this._selectBtn = $(
      `<button type="button" _selectedname="${this._selectedname}" class="wiroSelect__btn" role="button" aria-haspopup="true"></button>`
    );
    this._selectList = $(
      '<div class="wiroSelect__list" role="select" aria-expanded="false" aria-hidden="true"></div>'
    );
  }

  events() {
    if (!this._selectWrapper) return false;

    this._selectWrapper.on("click", ".wiroSelect__btn", (e) => {
      this.selectToggle();
    });

    // делаем элемень выбранным. также синхронизируем его с основным select
    this._selectWrapper.on("click", ".wiroSelect__item", (e) => {
      const targetItem = $(e.target);

      this._selectWrapper.find(".wiroSelect__item").each((idx, item) => {
        $(item).removeClass(this.options.selectedClass);

        const isSelected = $(item).data("index") === $(e.target).data("index");

        $(item).prop("ariaSelected", isSelected);
      });

      targetItem.addClass(this.options.selectedClass);

      this._selectedvalue = targetItem.data("_selectedvalue");
      this._selectedIndex = targetItem.data("index");

      $(this.selectOptions).eq(targetItem.data("index")).prop("selected", true);
      this._selectBtn.text(targetItem.text());

      this.selectToggle();
    });

    // закрывать select, если мы кликнули за его пределами
    $(window).on("click", (e) => {
      if (
        !$(e.target).closest(this._selectWrapper).length &&
        this.isSelectOpened()
      ) {
        this.closeSelect();
      }
    });

    this._selectWrapper.on("keydown", ".wiroSelect__btn", (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        const currentIndex = this._selectedIndex;
        let newIndex;

        if (e.key === "ArrowUp") {
          newIndex =
            currentIndex > 0 ? currentIndex - 1 : this.selectOptions.length - 1;
        } else if (e.key === "ArrowDown") {
          newIndex =
            currentIndex < this.selectOptions.length - 1 ? currentIndex + 1 : 0;
        }

        this.selectOptionByIndex(newIndex);
      }

      if (e.key === "Escape" && this.isSelectOpened()) {
        this.closeSelect();
        e.stopPropagation();
      }
    });

    this._selectBtn.on("blur", (e) => {
      this.closeSelect();
    });
  }

  selectOptionByIndex(index) {
    const targetItem = this._selectWrapper.find(`[data-index="${index}"]`);
    if (targetItem.length) {
      this._selectWrapper
        .find(".wiroSelect__item")
        .removeClass(this.options.selectedClass);
      targetItem.addClass(this.options.selectedClass);

      this._selectedvalue = targetItem.data("value");
      this._selectedIndex = index;

      $(this.selectOptions)
        .prop("selected", false)
        .eq(index)
        .prop("selected", true);

      this._selectBtn.text(targetItem.text());

      this.selectListPosition(this._selectBtn);
    }
  }

  isSelectOpened() {
    return this._selectWrapper.hasClass("wiroSelect--expanded");
  }

  selectToggle() {
    if (!this.isSelectOpened()) this.openSelect();
    else this.closeSelect();
  }

  openSelect() {
    this._selectBtn.addClass("active");
    this._selectWrapper.addClass("wiroSelect--expanded");

    this.selectListPosition();
    this._selectList
      .attr("aria-hidden", false)
      .attr("aria-expanded", true)
      .slideDown(this.options.slideToggleTiming);
  }

  closeSelect() {
    this._selectBtn.removeClass("active");

    this._selectList
      .attr("aria-hidden", true)
      .attr("aria-expanded", false)
      .slideUp(this.options.slideToggleTiming, () => {
        this._selectWrapper.removeClass("wiroSelect--expanded");
        this.selectListPosition();
      });
  }

  selectListPosition() {
    const btnHeight = this._selectBtn.outerHeight();

    const currentSelectHeight =
      this._selectWrapper[0].getBoundingClientRect().bottom +
      this._selectList.outerHeight();

    if (currentSelectHeight <= $(window).outerHeight()) {
      this._selectList.css({
        "padding-top": btnHeight + "px",
        "padding-bottom": 0,
        top: "5px",
        bottom: "auto",
      });
    } else {
      this._selectList.css({
        "padding-top": 0,
        "padding-bottom": btnHeight + "px",
        top: "auto",
        bottom: "5px",
      });
    }
  }
}