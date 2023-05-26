import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import HeaderBar from "../../components/HeaderBar/index";
import { MemoryRouter } from "react-router";
describe("HeaderBar", () => {
  test("renders correctly", () => {
    render(<HeaderBar />);

    // HeaderBar의 특정 요소를 찾아서 테스트합니다.
    const logoElement = screen.getByText("Cocoa");
    const productLink = screen.getByText("Product");
    const teamLink = screen.getByText("Team");
    const myPageLink = screen.getByText("MY PAGE");
    const getStartLink = screen.getByText("Get Start");

    // 테스트 결과를 확인합니다.
    expect(logoElement).toBeInTheDocument();
    expect(productLink).toBeInTheDocument();
    expect(teamLink).toBeInTheDocument();
    expect(myPageLink).toBeInTheDocument();
    expect(getStartLink).toBeInTheDocument();
  });

  test("toggles menu correctly", () => {
    render(<HeaderBar />);

    // 토글 메뉴 버튼을 클릭합니다.
    const toggleButton = screen.getByLabelText("Toggle Menu");
    fireEvent.click(toggleButton);

    // 토글 메뉴가 나타나는지 확인합니다.
    const menuElement = screen.getByRole("menu");
    expect(menuElement).toBeInTheDocument();

    // 토글 메뉴를 닫습니다.
    fireEvent.click(toggleButton);

    // 토글 메뉴가 사라졌는지 확인합니다.
    expect(menuElement).not.toBeInTheDocument();
  });

  // 추가적인 테스트 케이스 작성 가능
});
