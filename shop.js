let items = [
  { id: 1, name: "해피 메이커", price: 27999999, etc: true },
  { id: 2, name: "노스텔지어 캔디", price: 12999999, etc: true },
  { id: 3, name: "포장지 12B357", price: 9999999, etc: false },
  { id: 4, name: "네크로노미콘", price: 49999999, etc: false },
  { id: 5, name: "우리가 도움!", price: 66666666, etc: false },
];
function formatPrice(price) {
  return "₩" + price.toLocaleString();
}

function calculateTotal() {
  let total = 0;

  $("input[type='checkbox']:checked").each(function () {
    let itemId = $(this).attr("id").split("-")[1];
    let item = items.find((i) => i.id == itemId);
    if (item) {
      total += item.price;
    }
  });

  $("#cart").text(`=${formatPrice(total)}`);

  if (total >= 100000000) {
    let discountedTotal = total * 0.8;
    $("#saled-total").text(formatPrice(discountedTotal));
    $(".text-red.sale").show();
    $("#cart").css("text-decoration", "line-through");
  } else {
    $(".text-red.sale").hide();
    $("#cart").css("text-decoration", "none");
  }
}

function renderItems() {
  let $form = $("<form></form>");

  items.forEach((item) => {
    let $checkbox = $(
      `<input type="checkbox" id="item-${item.id}" name="item-${item.id}">`
    );

    let itemText = `${item.name} - ${formatPrice(item.price)}`;

    let $label = $(`<label for="item-${item.id}">${itemText}</label>`);

    if (item.etc) {
      $label = $("<div></div>")
        .append($checkbox)
        .append($label)
        .append('<span class="text-blue">★</span>');
    } else {
      $label = $("<div></div>").append($checkbox).append($label);
    }

    $form.append($label);
  });

  $form.on("change", "input[type='checkbox']", calculateTotal);

  $("#item-list").append($form);
}

$(document).ready(function () {
  $(".popover-before").hide();
  $(".sale").hide();

  renderItems();

  $(".text-blue").on("click", function (event) {
    const starPosition = $(this).offset();

    $(".popover-before")
      .css({
        top: starPosition.top + "px",
        left: starPosition.left + 20 + "px",
        position: "absolute",
      })
      .toggle();

    event.stopPropagation();
  });

  $(document).on("click", function () {
    $(".popover-before").hide();
  });
});
